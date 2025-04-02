import React, { useState } from "react"
import Progress from "../shared/Progress.jsx"
import Button from "../shared/Button.jsx"
import { FaCheck, FaFolderOpen, FaPause, FaPlay, FaRegFolderOpen } from "react-icons/fa6"
import clsx from "clsx"
import Spinner from "../shared/Spinner.jsx"
import { dateString } from "../../lib/utils.js"
import { IoMdClose } from "react-icons/io"
import { useDispatch } from "react-redux"
import { removeDownload } from "../../store/slices/downloads.slice.js"

const getPercentage = (value, total) => (value * 100) / total || 0
function formatBytes(bytes, decimals = 2) {
	if (bytes === 0) return "0 B"

	const k = 1024
	const sizes = ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"]
	const i = Math.floor(Math.log(bytes) / Math.log(k))

	return `${parseFloat((bytes / Math.pow(k, i)).toFixed(decimals))} ${sizes[i]}`
}

export default function DownloadItem({ id, data }) {
	const dispatch = useDispatch()
	const [expanded, setExpanded] = useState(false)
	const [paused, setPaused] = useState(false)
	const [tabIndex, setTabIndex] = useState(0)

	const downloadPercentage = getPercentage(data.downloaded, data.size)

	return (
		<div className="rounded-lg bg-secondary">
			<div
				className={clsx(
					"p-4 flex items-center gap-4 border-b",
					expanded ? "border-border" : "border-transparent"
				)}
			>
				<button
					className="flex px-4"
					onClick={() => setPaused((i) => !i)}
					disabled={data.status === -1}
				>
					{data.status === -1 ? (
						<Spinner className={"!size-8 border-white/30 border-r-white border-b-white"} />
					) : data.status === 2 ? (
						<FaCheck className={"size-8"} />
					) : paused ? (
						<FaPlay className={"size-8"} />
					) : (
						<FaPause className={"size-8"} />
					)}
				</button>
				<div
					className={clsx("flex-1", data.files ? "cursor-pointer" : null)}
					onClick={data.files ? () => setExpanded((i) => !i) : null}
				>
					<span className="block">
						{data.files?.[0] || data.name}
						{data.files?.length > 1 && (
							<span className="opacity-50"> + {data.files.length - 1} more</span>
						)}
					</span>
					{data.status !== 2 && <Progress value={downloadPercentage} className="my-2.5" />}
					<div className="flex items-center gap-4">
						{data.status === -1 ? (
							<span>Please wait, connecting to peers...</span>
						) : data.status === 1 ? (
							<div>
								<span>{Math.floor(downloadPercentage)}%</span>
								<span className="inline-block mx-2">•</span>
								<span>
									{formatBytes(data.downloaded)} of {formatBytes(data.size)}
								</span>
								{data.files?.length ? (
									<>
										<span className="inline-block mx-2">•</span>
										<span>
											Files {data.files.filter((i) => i.size === i.downloaded).length} of{" "}
											{data.files.length}
										</span>
									</>
								) : null}
							</div>
						) : data.status === 2 ? (
							<div>
								<span>{dateString(+id)}</span>
								<span className="inline-block mx-2">•</span>
								<span>{formatBytes(data.size)}</span>
							</div>
						) : null}
						{data.status < 2 ? (
							<Button
								className={"rounded-full !bg-accent !py-1.5 !px-3"}
								onClick={(e) => {
									e.stopPropagation()
								}}
							>
								Cancel
							</Button>
						) : data.status === 2 ? (
							<div className="flex gap-2">
								<Button
									prefix={<FaRegFolderOpen size={18} />}
									className={"rounded-full !bg-accent !py-1.5 !px-3"}
									onClick={(e) => {
										e.stopPropagation()
										window.electronAPI.openFilePath(data.filePath)
									}}
								>
									Open
								</Button>
								<Button
									prefix={<IoMdClose size={18} />}
									className={"rounded-full !bg-accent !py-1.5 !px-3"}
									onClick={(e) => {
										e.stopPropagation()
										dispatch(removeDownload({ id }))
									}}
								>
									Remove
								</Button>
							</div>
						) : null}
					</div>
				</div>
			</div>
			{expanded && data.files?.length && (
				<div>
					{/* <div className="flex gap-4 m-4">
						{["Files (0/1)"].map((i, idx) => (
							<Button
								onClick={() => setTabIndex(idx)}
								className={clsx(
									"rounded-full justify-center !py-2 !px-3",
									tabIndex === idx ? "!bg-white text-black" : "!bg-accent"
								)}
							>
								{i}
							</Button>
						))}
					</div> */}
					{data.files?.map((file, index) => {
						const percentage = getPercentage(file.downloaded, file.size)
						return (
							<div className="p-4 flex items-center gap-4">
								<div className="text-center px-5">
									<span className="block text-2xl font-bold">{index + 1}.</span>
									<span>File</span>
								</div>
								<div className="flex-1">
									<span className="block">{file.name}</span>
									<Progress value={percentage} className="my-2.5" />
									<div>
										<span>{Math.floor(percentage)}%</span>
										<span className="inline-block mx-2">•</span>
										<span>
											{formatBytes(file.downloaded)} of {formatBytes(file.size)}
										</span>
									</div>
								</div>
							</div>
						)
					})}
				</div>
			)}
		</div>
	)
}
