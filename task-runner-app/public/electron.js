const path = require('path');
const { app, BrowserWindow } = require('electron');
const { ipcMain } = require('electron')
const isDev = require('electron-is-dev');
const Tree = require('task-runner-nvk-js/tools/tree');

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
	app.quit();
});

ipcMain.handle('run-command', async (event, { command, allCommands }) => {
  console.log({ allCommands, command });
  const tree = new Tree(command, allCommands);
  const result = await tree.executeRootCommand();
  return result;
});

function createWindow() {
  const window = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      preload: `${__dirname}\\preload.js`
    },
  });
  window.maximize();
  window.loadURL(isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`);
  if (isDev) { window.webContents.openDevTools({ mode: 'right' }); }
}