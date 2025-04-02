import React from "react"
import Main from "./screens/Main.jsx"
import { store } from "./store/store.js"
import { Provider } from "react-redux"
import "./styles/index.css"

export default function App() {
	return (
		<Provider store={store}>
			<Main />
		</Provider>
	)
}
