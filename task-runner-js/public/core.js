const runTask = require('../commands/run-task');
const { 
  logConsoleMessage: handleOutputMessage,
  logConsoleError: handleOutputError,
	coloredLog,
	spawnProcess,
	isConsoleCommand
 } = require('../tools/tools');


module.exports = {
  runTask,
  handleOutputMessage,
  handleOutputError,
	coloredLog,
	spawnProcess,
	isConsoleCommand
}