import { createSlice } from "@reduxjs/toolkit"

const downloadsSlice = createSlice({
	name: "downloads",
	initialState: {
		tasks: {},
	},
	reducers: {
		startDownload: (state, action) => {
			const { id, ...payload } = action.payload
			state.tasks[id] = payload
			state.tasks[id].status = -1
		},
		updateDownload: (state, action) => {
			const { id, downloaded, status } = action.payload
			if (state.tasks[id]) {
				state.tasks[id].downloaded = downloaded
				state.tasks[id].status = downloaded === state.tasks[id].size ? 2 : status
			}
		},
		removeDownload: (state, action) => {
			delete state.tasks[action.payload.id]
		},
	},
})

export const { startDownload, updateDownload, removeDownload } = downloadsSlice.actions
export default downloadsSlice.reducer
