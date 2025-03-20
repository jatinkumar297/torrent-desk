import React from "react"
import { Link, useLocation } from "react-router-dom"
import Button from "../shared/Button.jsx"
import { MdOutlineFileDownload, MdOutlineHistory, MdOutlineSettings } from "react-icons/md"
import clsx from "clsx"

const navUrls = [
	{ url: "/download", name: "Download", Icon: MdOutlineFileDownload },
	{ url: "/history", name: "History", Icon: MdOutlineHistory },
	{ url: "/settings", name: "Settings", Icon: MdOutlineSettings },
]

export default function Sidebar() {
	// const { pathname } = useLocation()
	return (
		<div className="h-screen sticky top-0 bg-secondary p-2 flex flex-col gap-1 w-52 border-r border-border">
			{navUrls.map((i) => (
				<div>
					<Button
						prefix={<i.Icon size={24} className="shrink-0" />}
						className={clsx(
							"w-full bg-transparent border-transparent hover:bg-accent"
							// pathname === i.url ? "bg-highlight border-highlight" : "hover:bg-accent"
						)}
					>
						<span>{i.name}</span>
					</Button>
				</div>
			))}
		</div>
	)
}
