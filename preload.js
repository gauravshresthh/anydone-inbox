const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
	isElectron: true,
	doThing: () => ipcRenderer.send('do-a-thing'),
	iWantTheNavBarClosed: () => ipcRenderer.send('do-a-thing'),
});
