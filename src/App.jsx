import React from "react"
import Main from "./screens/Main.jsx"
import { store } from "./store/store.js"
import { Provider } from "react-redux"
import "./styles/index.css"
import { HashRouter, Navigate, Route, Routes } from "react-router-dom"
import ScreenLayout from "./components/layout/ScreenLayout.jsx"

export default function App() {
	return (
		<Provider store={store}>
			<HashRouter basename="/download">
				<ScreenLayout>
					<Routes>
						<Route path='/history' Component={() => <>History</>} />
						<Route path='/settings' Component={() => <>Settings</>} />
						<Route path='/download' element={<Main />} />
						<Route path='*' element={<Navigate to={"/download"} />} />
					</Routes>
				</ScreenLayout>
			</HashRouter>
		</Provider>
	)
}
