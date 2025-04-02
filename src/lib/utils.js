export const getFileData = (_file) =>
	new Promise((res, rej) => {
		const reader = new FileReader()

		reader.onload = async (event) => {
			res({
				data: event.target.result,
				name: _file.name,
			})
		}

		reader.onerror = (error) => rej(error)

		reader.readAsArrayBuffer(_file)
	})

export const dateString = (date) => {
	const options = { weekday: "short", year: "numeric", month: "short", day: "2-digit" }
	return new Date(date).toLocaleDateString("en-US", options).replace(/,/g, "")
}
