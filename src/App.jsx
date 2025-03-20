import React from "react"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Download from "./screens/Download.jsx"
import History from "./screens/History.jsx"
import Settings from "./screens/Settings.jsx"
import Sidebar from "./components/layout/Sidebar.jsx"
import "./styles/index.css"

export default function App() {
	return (
		// <BrowserRouter basename="/">
		<div className="flex">
			<Sidebar />
			<div className="flex-1">
				<Download />
				{/* <Routes>
						<Route path="/download" element={<Download />} />
						<Route path="/history" element={<History />} />
						<Route path="/settings" element={<Settings />} />
					</Routes> */}
			</div>
		</div>
		// </BrowserRouter>
	)
}
