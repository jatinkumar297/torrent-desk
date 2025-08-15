import React from "react"
import Sidebar from "./Sidebar.jsx"

export default function ScreenLayout({ children }) {
	return (
		<div className='flex'>
			<Sidebar />
			<div className='w-full'>{children}</div>
		</div>
	)
}
