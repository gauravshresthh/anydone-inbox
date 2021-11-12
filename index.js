const path = require('path');
const { app, BrowserWindow } = require('electron');
const isDev = require('electron-is-dev');

require('@electron/remote/main').initialize();

function createWindow() {
	// console.log('hthis is me');
	// Create the browser window.
	const win = new BrowserWindow({
		width: 800,
		height: 600,
		icon: path.join(__dirname, 'favicon.png'),
		webPreferences: {
			nodeIntegration: true,
		},
	});
	win.setIcon(path.join(__dirname, 'favicon.png'));
	// and load the index.html of the app.
	// win.loadFile("index.html");
	win.loadURL(
		isDev ? 'http://localhost:3000/' : 'https://inbox.anydone.net/'
		// : `file://${path.join(__dirname, '../build/index.html')}`,
	);

	// Open the DevTools.
	if (isDev) {
		win.webContents.openDevTools({ mode: 'detach' });
	}
}

process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = 'true';
// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit();
	}
});

app.on('activate', () => {
	if (BrowserWindow.getAllWindows().length === 0) {
		createWindow();
	}
});
