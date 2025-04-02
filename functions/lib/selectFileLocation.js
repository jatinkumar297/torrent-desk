import { dialog } from "electron"

export async function selectFileLocation(defaultFileName) {
	const { filePath } = await dialog.showSaveDialog({
		title: "Save File",
		defaultPath: defaultFileName,
		filters: [{ name: "Binary file", extensions: ["bin"] }],
	})

	return filePath || null
}
