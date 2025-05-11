// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
import { contextBridge, ipcRenderer } from "electron"
import { IPC_EVENT_NAMES } from "../constants"

contextBridge.exposeInMainWorld("electronAPI", {
	processTorrent: (file) => ipcRenderer.invoke(IPC_EVENT_NAMES.PROCESS_TORRENT, file),
	pauseDownload: (id) => ipcRenderer.invoke(IPC_EVENT_NAMES.PAUSE_DOWNLOAD, id),

	startDownload: (callback) => {
		ipcRenderer.on(IPC_EVENT_NAMES.START_DOWNLOAD, (_event, data) => callback(data))
	},
	updateDownload: (callback) => {
		ipcRenderer.on(IPC_EVENT_NAMES.UPDATE_DOWNLOAD, (_event, data) => callback(data))
	},
	downloadError: (callback) => {
		ipcRenderer.on(IPC_EVENT_NAMES.DOWNLOAD_ERROR, (_event, data) => callback(data))
	},
	openFilePath: (filePath) => {
		ipcRenderer.invoke(IPC_EVENT_NAMES.OPEN_FILE_PATH, filePath)
	}
})
