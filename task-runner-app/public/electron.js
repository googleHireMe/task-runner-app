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
  const sendLogObjectToTheClient = ({outputObject, processId}) => {
    const { processOutput, processExecutionPath } = outputObject;
    console.log('outputObject',outputObject);
    window.webContents.send('log', {
      processOutput,
      processExecutionPath,
      processId
    });
  }
  const scriptToRunUserCommandPath = require.resolve('task-runner-nvk-js/public/run-task-executable');
  const parameters = [`${JSON.stringify(command)}`, `${JSON.stringify(allCommands)}`];
  const childProcessRunningUserCommand = childProcess.fork(scriptToRunUserCommandPath, parameters)
  childProcessRunningUserCommand.on('message', (outputObject) => sendLogObjectToTheClient({ outputObject, processId: childProcessRunningUserCommand.pid }));
  childProcessRunningUserCommand.on('error', (outputObject) => sendLogObjectToTheClient({ outputObject, processId: childProcessRunningUserCommand.pid }));
  console.log('returning childProcessRunningUserCommand', childProcessRunningUserCommand);
  return childProcessRunningUserCommand.pid;
});

ipcMain.handle('kill-process', async (event, processId) => {
  return await process.kill(processId);
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