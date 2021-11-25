const path = require('path');
const { app, BrowserWindow, shell, Tray, Menu } = require('electron');
const isDev = require('electron-is-dev');

// require('@electron/remote/main').initialize();

// let isQuiting;
// let tray;

function createWindow() {
	// console.log('hthis is me');
	// Create the browser window.
	let mainWindow = new BrowserWindow({
		width: 1024,
		height: 768,
		minHeight: 800,
		minWidth: 600,
		icon: path.join(__dirname, 'favicon.png'),
		webPreferences: {
			nodeIntegration: false,
			nativeWindowOpen: true,
			webSecurity: false,
			contextIsolation: true,
			show: false,
			preload: path.join(__dirname, 'preload.js'),
		},
	});
	mainWindow.setIcon(path.join(__dirname, 'favicon.png'));

	// and load the index.html of the app.
	// mainWindow.loadFile("index.html");

	splash = new BrowserWindow({
		width: 1024,
		height: 768,
		transparent: true,
		menu: null,
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
	splash.loadURL(`file://${path.join(__dirname)}/splash.html`);
	let url = 'https://inbox.anydone.net/';

	isDev ? 'http://localhost:3000/' : 'https://inbox.anydone.net/';
	// : `file://${path.join(__dirname, '../build/index.html')}`,

	mainWindow.loadURL(url);

	mainWindow.webContents.on(
		'new-window',
		(
			event,
			url,
			frameName,
			disposition,
			options,
			additionalFeatures,
			referrer,
			postBody
		) => {
			event.preventDefault();
			const childWindow = new BrowserWindow({
				webContents: options.webContents,
				width: 1024,
				height: 768, // use existing webContents if provided
				show: false,
			});
			childWindow.setMenu(null);
			childWindow.once('ready-to-show', () => childWindow.show());
			if (!options.webContents) {
				const loadOptions = {
					httpReferrer: referrer,
				};
				if (postBody != null) {
					const { data, contentType, boundary } = postBody;
					loadOptions.postData = postBody.data;
					loadOptions.extraHeaders = `content-type: ${contentType}; boundary=${boundary}`;
				}

				childWindow.loadURL(url, loadOptions); // existing webContents will be navigated automatically
			}
			event.newGuest = childWindow;
		}
	);

	mainWindow.once('ready-to-show', () => {
		splash.destroy();
		mainWindow.show();
	});
	// Open the DevTools.
	// if (isDev) {
	// 	mainWindow.webContents.openDevTools({ mode: 'detach' });
	// }
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
