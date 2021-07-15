const path = require('path');
const { app, BrowserWindow } = require('electron');
const { ipcMain } = require('electron')
const isDev = require('electron-is-dev');
const { runTask } = require('task-runner-nvk-js/public/core');

let window = null;
app.whenReady()
  .then(() => createWindow(window));

app.on('window-all-closed', () => {
  app.quit();
});

ipcMain.handle('run-command', async (event, { command, allCommands }) => {
  console.log({ allCommands, command });
  const result = await runTask(command, allCommands, (data, path, commandConfiguration) => {
    data = data.toString();
    window.webContents.send('log', {data, path, commandConfiguration});
  });
  return result;
});

function createWindow() {
  window = new BrowserWindow({
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