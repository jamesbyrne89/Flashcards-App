const path = require('path');

module.exports = {
	entry: "./app/assets/scripts/app.js",
	output: {
		path: path.resolve(__dirname, './app/temp/assets/scripts/'),
		filename: "app.js"
	}
}