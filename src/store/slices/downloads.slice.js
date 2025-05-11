import { createSlice } from "@reduxjs/toolkit"

// status => [-2: failed | -1: connecting peers | 0: paused | 1: active download | 2: complete download]
const downloadsSlice = createSlice({
	name: "downloads",
	initialState: {
		tasks: {
			// ["kaiulef"]: {
			// 	id: "kaiulef",
			// 	name: "torrent.info.name.toString()",
			// 	size: 200232,
			// 	status: -2,
			// 	downloaded: 89328,
			// 	filePath: "/somehwere.pm3",
			// 	error: 'this is an error message'
			// 	// files: torrent?.files?.map((i) => ({
			// 	// 	name: i.name.toString(),
			// 	// 	size: i.length,
			// 	// 	downloaded: 0
			// 	// }))
			// }
		}
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
				state.tasks[id].status = status
			}
		},
		downloadError: (state, action) => {
			const { id, error } = action.payload
			if (state.tasks[id]) {
				state.tasks[id].error = error
				state.tasks[id].status = -2
			}
		},
		removeDownload: (state, action) => {
			delete state.tasks[action.payload.id]
		}
	}
})

export const { startDownload, updateDownload, removeDownload, downloadError } = downloadsSlice.actions
export default downloadsSlice.reducer
