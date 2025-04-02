import React from "react"
import { MdAdd } from "react-icons/md"
import DownloadItem from "../components/custom/DownloadItem.jsx"
import { useSelector } from "react-redux"
import useElectronApi from "../lib/hooks/useElectronApi.jsx"

export default function Main() {
	const downloads = useSelector((state) => state.downloads.tasks)
	const [processFile] = useElectronApi()

	return (
		<div className="px-6 mb-8 max-w-7xl mx-auto">
			<div className="my-8 flex items-center justify-between">
				<h1 className="text-3xl font-bold">Welcome to Node Torrent Desktop</h1>
				<label className="block cursor-pointer">
					<input
						type="file"
						hidden={true}
						onChange={(e) => processFile(e.target.files?.[0] || null)}
						accept=".torrent"
					/>
					<div className="input-component">
						<MdAdd size={24} />
						<span>Download</span>
					</div>
				</label>
			</div>
			<div className="space-y-3">
				{Object.keys(downloads || {}).map((id) => (
					<DownloadItem key={id} id={id} data={downloads[id]} />
				))}
			</div>
		</div>
	)
}
