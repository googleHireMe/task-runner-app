const process = require('process');
const childProcess = require('child_process');
const colors = require ('./console-colors');
const isWindows = process.platform === 'win32';

const logConsoleMessage = (data, path, commandConfiguration, color = colors.FgCyan) => { 
	const { name } = commandConfiguration;
	const dirName = path.split('/').pop()
	const tag = `${dirName}-${name}`;
	console.log(`[${color}${tag}${colors.Reset}]: ${data}`); 
}
const logConsoleError = (data, path, commandConfiguration, color = colors.FgYellow) => { 
	const { name } = commandConfiguration;
	const dirName = path.split('/').pop()
	const tag = `${dirName}-${name}`;
	coloredLog(`[${tag}]: ${data}`, color); 
}
const coloredLog = (message, color) => { color ? console.log(`${color}%s${colors.Reset}`, message) : console.log(message) };
const spawnProcess = (path, command, parameters) => childProcess.spawn(`${command}${isWindows ? '.cmd' : ''}`, parameters, { cwd: path, env: process.env });
const isConsoleCommand = (task) => task.isConsoleCommand === true;

module.exports = {
	logConsoleMessage,
	logConsoleError,
	coloredLog,
	spawnProcess,
	isConsoleCommand
}