const { ipcMain } = require("electron")
const { default: processTorrent } = require("../functions/processTorrent.js")

ipcMain.handle("process-torrent", async (event, file) => {
	console.log("Processing file:", file.name)
	processTorrent(file.data)
})
