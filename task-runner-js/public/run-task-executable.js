const runTask = require('../commands/run-task');
const process = require('process');

const arguments = process.argv;
process.send(`Arguments: ${arguments}`);
const command = JSON.parse(arguments[2]);
const allCommands = JSON.parse(arguments[3]);
process.send(`command: ${command}`);
process.send(`allCommands: ${allCommands}`);
handleOutputMessage = (data) => { process.send(`HEEEY: ${data}`); }
runTask(command, allCommands, handleOutputMessage)
  .catch(error => process.send('Error occured:', error));