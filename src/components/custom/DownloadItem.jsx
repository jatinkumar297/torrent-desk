import React, { useState } from "react"
import Progress from "../shared/Progress.jsx"
import Button from "../shared/Button.jsx"
import { FaPause, FaPlay } from "react-icons/fa6"
import clsx from "clsx"

export default function DownloadItem() {
	const [expanded, setExpanded] = useState(false)
	const [paused, setPaused] = useState(false)
	const [tabIndex, setTabIndex] = useState(0)

	return (
		<div className="rounded-lg bg-secondary">
			<div
				className={clsx(
					"p-4 flex items-center gap-4 border-b",
					expanded ? "border-border" : "border-transparent"
				)}
			>
				<button className="flex px-4" onClick={() => setPaused((i) => !i)}>
					{paused ? <FaPlay className={"size-8"} /> : <FaPause className={"size-8"} />}
				</button>
				<div className="flex-1 cursor-pointer" onClick={() => setExpanded((i) => !i)}>
					<span className="block">
						Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quibusdam, voluptatem.mkv
						<span className="opacity-50"> + 5 more</span>
					</span>
					<Progress value={20} className="my-2.5" />
					<div className="flex items-center gap-4">
						<div>
							<span>25%</span>
							<span className="inline-block mx-2">•</span>
							<span>30 MB of 2.25 GB</span>
							<span className="inline-block mx-2">•</span>
							<span>Pieces 1 of 8</span>
						</div>
						<Button
							className={"rounded-full !bg-accent !py-1.5 !px-3"}
							onClick={(e) => {
								e.stopPropagation()
							}}
						>
							Cancel
						</Button>
					</div>
				</div>
			</div>
			{expanded && (
				<div>
					<div className="flex gap-4 m-4">
						{["Ongoing", "Downloaded", "Progress Logs"].map((i, idx) => (
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
					</div>
					<div className="p-4 flex items-center gap-4">
						<div className="text-center px-5">
							<span className="block text-2xl font-bold">1.</span>
							<span>Piece</span>
						</div>
						<div className="flex-1">
							<span className="block">
								Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quibusdam, voluptatem.mkv
							</span>
							<Progress value={20} className="my-2.5" />
							<div>
								<span>25%</span>
								<span className="inline-block mx-2">•</span>
								<span>30 MB of 2.25 GB</span>
							</div>
						</div>
					</div>
					<div className="p-4 flex items-center gap-4">
						<div className="text-center px-5">
							<span className="block text-2xl font-bold">2.</span>
							<span>Piece</span>
						</div>
						<div className="flex-1">
							<span className="block">
								Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quibusdam, voluptatem.mkv
							</span>
							<Progress value={20} className="my-2.5" />
							<div>
								<span>25%</span>
								<span className="inline-block mx-2">•</span>
								<span>30 MB of 2.25 GB</span>
							</div>
						</div>
					</div>
					<div className="p-4 flex items-center gap-4">
						<div className="text-center px-5">
							<span className="block text-2xl font-bold">3.</span>
							<span>Piece</span>
						</div>
						<div className="flex-1">
							<span className="block">
								Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quibusdam, voluptatem.mkv
							</span>
							<Progress value={20} className="my-2.5" />
							<div>
								<span>25%</span>
								<span className="inline-block mx-2">•</span>
								<span>30 MB of 2.25 GB</span>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	)
}
