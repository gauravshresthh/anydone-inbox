const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
	doThing: () => ipcRenderer.send('do-a-thing'),
	iWantTheNavBarClosed: () => ipcRenderer.send('do-a-thing'),
});
