import React from "react"
// import { Link, useLocation } from "react-router-dom"
import Button from "../shared/Button.jsx"
import { MdOutlineFileDownload, MdOutlineHistory, MdOutlineSettings } from "react-icons/md"
import clsx from "clsx"
import { Link, useLocation } from "react-router-dom"

const navUrls = [
	{ url: "/download", Icon: MdOutlineFileDownload },
	{ url: "/history", Icon: MdOutlineHistory },
	{ url: "/settings", Icon: MdOutlineSettings }
]

export default function Sidebar() {
	const { pathname } = useLocation()
	return (
		<div className='h-screen bg-secondary p-2 flex flex-col gap-1 border-r border-border'>
			{navUrls.map((i) => (
				<div>
					<Link to={i.url} tabIndex={-1}>
						<Button
							className={clsx(
								"w-full bg-transparent border-transparent hover:bg-accent",
								pathname.slice(0) === i.url ? "bg-highlight border-highlight hover:bg-highlight" : null
							)}
						>
							<i.Icon size={24} />
						</Button>
					</Link>
				</div>
			))}
		</div>
	)
}
