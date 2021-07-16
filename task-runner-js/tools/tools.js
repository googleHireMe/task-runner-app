const process = require('process');
const childProcess = require('child_process');
const colors = require ('./console-colors');
const isWindows = process.platform === 'win32';
const exceptionalCommands = ['git'];

const logConsoleMessage = ({processOutput, path, commandConfiguration, color = colors.FgYellow}) => { 
	const { name } = commandConfiguration;
	const dirName = path.split('/').pop()
	const tag = `${dirName}-${name}`;
	console.log(`[${color}${tag}${colors.Reset}]: ${processOutput}`); 
}
const logConsoleError = ({processOutput, path, commandConfiguration, color = colors.FgYellow}) => { 
	const { name } = commandConfiguration;
	const dirName = path.split('/').pop()
	const tag = `${dirName}-${name}`;
	coloredLog(`[${tag}]: ${processOutput}`, color); 
}
const coloredLog = (message, color) => { color ? console.log(`${color}%s${colors.Reset}`, message) : console.log(message) };
const spawnProcess = (path, command, parameters) => {
	const OsSpecifigCommand =`${command}${isWindows && !exceptionalCommands.includes(command) ? '.cmd' : ''}`;
	return childProcess.spawn(OsSpecifigCommand, parameters, { cwd: path, env: process.env });
}
const isConsoleCommand = (task) => task.isConsoleCommand === true;

module.exports = {
	logConsoleMessage,
	logConsoleError,
	coloredLog,
	spawnProcess,
	isConsoleCommand,
	exceptionalCommands
}