import { configureStore } from "@reduxjs/toolkit"
import downloadsReducer from "./slices/downloads.slice.js"

export const store = configureStore({
	reducer: {
		downloads: downloadsReducer,
	},
})
