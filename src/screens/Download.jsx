import React, { useState } from "react"
import { MdAdd } from "react-icons/md"
import Button from "../components/shared/Button.jsx"
import DownloadItem from "../components/custom/DownloadItem.jsx"

export default function Download() {
	const [file, setFile] = useState(null)

	const getFileData = (_file) =>
		new Promise((res, rej) => {
			const reader = new FileReader()

			reader.onload = async (event) => {
				res({
					data: event.target.result,
					name: _file.name,
				})
			}

			reader.onerror = (error) => rej(error)

			reader.readAsArrayBuffer(_file)
		})

	const onChange = async (e) => {
		const _file = e.target.files?.[0] || null
		setFile(_file)
		if (_file) {
			const fileData = await getFileData(_file)
			const response = await window.electronAPI.processTorrent(fileData)
			console.log({ response })
		}
	}

	return (
		<div className="px-6 mb-8">
			<div className="my-8 flex items-center justify-between">
				<h1 className="text-3xl font-bold">Welcome to Node Torrent Desktop</h1>
				<Button prefix={<MdAdd size={24} />}>
					<span>Download</span>
				</Button>
			</div>
			<div className="space-y-3">
				<DownloadItem />
				<DownloadItem />
				<DownloadItem />
			</div>
		</div>
	)
}
