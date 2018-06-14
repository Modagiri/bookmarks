const { app, BrowserWindow } = require('electron');


let mainWindow = null;

app.on('ready', () => {
	console.log("Shiiiit");

	mainWindow = new BrowserWindow({
		webPreferences: {
			nodeIntegration: true,
		}
	});

	console.log(`file://${__dirname}/index.html`);
	mainWindow.webContents.loadURL(`file://${__dirname}/index.html`);
});