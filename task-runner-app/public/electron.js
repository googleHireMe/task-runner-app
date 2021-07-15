const path = require('path');
const { app, BrowserWindow } = require('electron');
const { ipcMain } = require('electron')
const isDev = require('electron-is-dev');
const { runConsoleCommand } = require('task-runner-nvk-js/public/core');
const process = require('process');
const childProcess = require('child_process');
const { spawnProcess } = require('task-runner-nvk-js/tools/tools');

let window = null;
app.whenReady()
  .then(() => createWindow(window));

app.on('window-all-closed', () => {
  app.quit();
});

// ipcMain.handle('run-command', async (event, { command, allCommands }) => {
//   console.log({ allCommands, command });
//   const result = await runTask(command, allCommands, (data, path, commandConfiguration) => {
//     data = data.toString();
//     window.webContents.send('log', {data, path, commandConfiguration});
//   });
//   return result;
// });

ipcMain.handle('run-command', async (event, { command, allCommands }) => {
  console.log({ allCommands, command });
  const sendLogToTheClient = (data) => {
    console.log(`${data}`);
    window.webContents.send('log', `${data}`);
  }
  const scriptToRunUserCommandPath = require.resolve('task-runner-nvk-js/public/run-task-executable');
  console.log('path', scriptToRunUserCommandPath);
  const nodeCommand = 'node';
  const parameters = [ `${JSON.stringify(command)}`, `${JSON.stringify(allCommands)}`];
  //const process = spawnProcess(path, nodeCommand, parameters);
  const childProcessRunningUserCommand = childProcess.fork(scriptToRunUserCommandPath, parameters)
  childProcessRunningUserCommand.on('message', sendLogToTheClient);
  childProcessRunningUserCommand.on('error', sendLogToTheClient);
  setTimeout(() => {
    childProcessRunningUserCommand.kill();
    sendLogToTheClient('KIIIIIILLED');
  }, 8000)
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