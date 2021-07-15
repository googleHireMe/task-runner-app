const {ipcRenderer, contextBridge} = require('electron');

contextBridge.exposeInMainWorld("desktopApi",{
	invoke: (channel, data) => ipcRenderer.invoke(channel, data)
})