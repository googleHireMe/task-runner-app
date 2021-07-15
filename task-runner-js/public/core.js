const runTask = require('../commands/run-task');
const runConsoleCommand = require('../commands/run-console-command');

const { 
  logConsoleMessage: handleOutputMessage,
  logConsoleError: handleOutputError,
	coloredLog,
	spawnProcess,
	isConsoleCommand
 } = require('../tools/tools');


module.exports = {
  runTask,
	runConsoleCommand,
  handleOutputMessage,
  handleOutputError,
	coloredLog,
	spawnProcess,
	isConsoleCommand
}