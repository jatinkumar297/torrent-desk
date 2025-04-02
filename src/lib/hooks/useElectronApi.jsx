import React, { useEffect } from "react"
import { getFileData } from "../utils"
import { useDispatch } from "react-redux"
import { startDownload, updateDownload } from "../../store/slices/downloads.slice"

export default function useElectronApi() {
	const dispatch = useDispatch()
	const processFile = async (_file) => {
		const fileData = await getFileData(_file)
		await window.electronAPI.processTorrent(fileData)
	}

	useEffect(() => {
		window.electronAPI.startDownload((data) => dispatch(startDownload(data)))
		window.electronAPI.updateDownload((data) => dispatch(updateDownload(data)))
	}, [])

	return [processFile]
}
