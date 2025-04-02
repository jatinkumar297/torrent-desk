import { IPC_EVENT_NAMES } from "../constants.js"

const { ipcMain, shell } = require("electron")
const { default: processTorrent } = require("../functions/processTorrent.js")

async function processTorrentHandler(e, window, file) {
	processTorrent(window, file.data)
}

export function attachListeners(mainWindow) {
	ipcMain.handle(IPC_EVENT_NAMES.PROCESS_TORRENT, (event, ...params) =>
		processTorrentHandler(event, mainWindow, ...params)
	)
}

ipcMain.handle(IPC_EVENT_NAMES.OPEN_FILE_PATH, (event, filePath) => {
	if (filePath) shell.showItemInFolder(filePath)
})
