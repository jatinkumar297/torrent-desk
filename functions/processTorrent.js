import * as fs from "fs"
import { createHash } from "crypto"
import { batchUp, constants, createDir, createPreAllocatedFile, getState, throttle } from "./lib/utils.js"
import bencode from "./modules/bencode.js"
import connectToPeer from "./handlers/connectToPeer.js"
import findActiveSeeders from "./helpers/findActiveSeeders.js"
import createJobScheduler from "./modules/jobScheduler.js"
import { reconstructFile, reconstructMultiFile } from "./modules/reconstruct.js"
import announceToTracker from "./modules/announce/index.js"
import { IPC_EVENT_NAMES } from "../constants.js"
import { selectFileLocation } from "./lib/selectFileLocation.js"
import EventEmitter from "events"
import path from "path"

export default async function processTorrent(window, buf, id) {
	try {
		const torrent = bencode.decode(Buffer.from(buf))
		const infoHash = createHash("sha1").update(bencode.encode(torrent.info)).digest("hex")
		const size = torrent.info.files
			? torrent.info.files.map((file) => file.length).reduce((a, b) => a + b)
			: torrent.info.length

		const pieceHashes = batchUp(torrent.info.pieces, 20, (p) => p.toString("hex"))
		const pieceCount = pieceHashes.length
		const pieceLength = torrent.info["piece length"]
		const lastPieceLength = size % pieceLength
		const totalBlocksCount = Math.ceil(
			(pieceLength / constants.blockSize) * (pieceCount - 1) + lastPieceLength / constants.blockSize
		)

		const logsDir = `logs/${torrent.info.name}`
		const progressFilePath = createDir(`${logsDir}/progress.json`)
		const tempFilePath = await selectFileLocation(`${torrent.info.name}.bin`)
		if (!tempFilePath) return
		createPreAllocatedFile(tempFilePath, size)

		window.webContents.send(IPC_EVENT_NAMES.START_DOWNLOAD, {
			id: id,
			name: torrent.info.name.toString(),
			size: torrent.info.length,
			status: -1,
			downloaded: 0,
			filePath: path.join(torrent?.files ? torrent.files[0].name.toString() : tempFilePath, "../"),
			files: torrent?.files?.map((i) => ({
				name: i.name.toString(),
				size: i.length,
				downloaded: 0
			}))
		})

		const sendUpdate = throttle((params) => {
			window.webContents.send(IPC_EVENT_NAMES.UPDATE_DOWNLOAD, params)
		}, 500)

		function reconstruct() {
			const callback = () => {
				fs.rmSync(logsDir, { recursive: true, force: true })
				fs.rmSync(tempFilePath, { recursive: true, force: true })
				sendUpdate({ id, downloaded: torrent.info.length, status: 2 })
			}

			if (torrent.info.files?.length) reconstructMultiFile(tempFilePath, torrent, callback)
			else if (torrent.info.name)
				reconstructFile(tempFilePath, path.join(tempFilePath, "../", torrent.info.name.toString()), callback)
		}

		let {
			receivedBlocks = 0,
			unProcessedBitfields = [],
			indexesLib = Array(pieceCount).fill(true),
			piecesTrack = {},
			activePeers
		} = fs.existsSync(progressFilePath) ? JSON.parse(fs.readFileSync(progressFilePath)) : {}

		if (!activePeers?.length) {
			const announceResponse = await announceToTracker(torrent.announce.toString(), infoHash, size)
			const { peers } = await findActiveSeeders(announceResponse.peers, infoHash)
			activePeers = peers
		}

		if (receivedBlocks > 0) {
			const incompletePieceIndexes = +Object.keys(piecesTrack).filter(
				(i) => piecesTrack[i].size > piecesTrack[i].receivedSize
			)
			if (incompletePieceIndexes.length) {
				console.log({ incompletePieceIndex: incompletePieceIndexes })
				for (const index of incompletePieceIndexes) {
					indexesLib[index] = true
				}
			} else {
				reconstruct()
				return
			}
		}

		const getPieceSize = (i) => (i === pieceCount - 1 ? lastPieceLength : pieceLength)
		const getIndexes = createJobScheduler(indexesLib, unProcessedBitfields)
		const saveProgressLog = throttle(() => {
			fs.writeFileSync(
				progressFilePath,
				JSON.stringify({
					receivedBlocks,
					unProcessedBitfields,
					indexesLib,
					piecesTrack,
					activePeers
				})
			)
		}, 5000)

		const print = throttle((...args) => console.log(...args), 1000)

		const fd = fs.openSync(tempFilePath, "r+")
		const writeToFile = (buffer, pieceIndex, offset, completion) => {
			const position = pieceIndex * pieceLength + offset
			try {
				receivedBlocks++
				const total = +((receivedBlocks * 100) / totalBlocksCount).toFixed(2)
				fs.writeSync(fd, buffer, 0, buffer.length, position)

				if (completion) saveProgressLog()
				sendUpdate({
					id,
					downloaded: receivedBlocks * constants.blockSize,
					status: 1
				})

				print(`⌛ Downloaded piece: ${pieceIndex} [${completion}%] - ${total}%`)
			} catch (err) {
				console.error(err)
				console.error("^^^ Write failed! Args: ", { buffer, pieceIndex, offset, position })
			}
		}

		let inProgress = 0

		const control = new EventEmitter()

		while (receivedBlocks < totalBlocksCount) {
			const currPeers = activePeers.filter((i) => !i.failed && !i.inProgress)
			if (!currPeers.length) throw new Error("No active peers")
			await Promise.all(
				currPeers.map(async (peer) => {
					if (!indexesLib.includes(true)) return
					const state = getState(pieceLength, pieceCount, getPieceSize)
					try {
						peer.inProgress = true
						inProgress++

						await connectToPeer({
							peer,
							infoHash,
							pieceCount,
							getPieceSize,
							getIndexes,
							writeToFile,
							state,
							pieceTrack: piecesTrack,
							control
						})
					} catch (error) {
						const unfulfilledIdxs = state.assignedIndexes.filter((i) => typeof i === "number")
						console.error("Error:", error, { unfulfilledIdxs }, "Active calls: ", inProgress)
						if (unfulfilledIdxs.length) {
							// peer.failed = true
							for (const idx of unfulfilledIdxs) indexesLib[idx] = true
						}
					}

					peer.inProgress = false
					inProgress--
					return
				})
			)
		}

		control.emit('stop')

		reconstruct()
	} catch (error) {
		window.webContents.send(IPC_EVENT_NAMES.DOWNLOAD_ERROR, {
			id,
			error: error.message || "Failed to download, please try again."
		})
	}
}
