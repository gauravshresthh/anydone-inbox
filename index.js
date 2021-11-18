const path = require('path');
const { app, BrowserWindow, Tray, Menu } = require('electron');
const isDev = require('electron-is-dev');

require('@electron/remote/main').initialize();

function createWindow() {
	// console.log('hthis is me');
	// Create the browser window.
	let win = new BrowserWindow({
		width: 800,
		height: 600,
		minHeight: 800,
		minWidth: 600,
		icon: path.join(__dirname, 'favicon.png'),
		webPreferences: {
			nodeIntegration: false,
			nativeWindowOpen: true,
			webSecurity: false,
			contextIsolation: true,
		},
	});
	win.setIcon(path.join(__dirname, 'favicon.png'));
	win.setMenu(null);
	// and load the index.html of the app.
	// win.loadFile("index.html");

	let url = 'https://inbox.anydone.net/';
	// isDev ? 'http://localhost:3000/' : 'https://inbox.anydone.net/';
	// : `file://${path.join(__dirname, '../build/index.html')}`,
	win.loadURL(url);
	if (process.platform !== 'darwin') {
		let appIcon = new Tray(path.join(__dirname, 'favicon.png'));

		let contextMenu = Menu.buildFromTemplate([
			{
				label: 'Show Anydone Inbox App',
				click: function () {
					win.show();
				},
			},
			{
				label: 'Quit Anydone',
				click: function () {
					app.isQuiting = true;
					app.quit();
				},
			},
		]);

		appIcon.setContextMenu(contextMenu);

		win.on('close', function (event) {
			event.preventDefault();
			win = null;
		});

		win.on('minimize', function (event) {
			event.preventDefault();
			win.hide();
		});

		win.on('show', function () {
			appIcon.setHighlightMode('always');
		});
	}

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
