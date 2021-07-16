const colors = require('../tools/console-colors');
const { coloredLog } = require('../tools/tools');
const { logConsoleMessage: logConsoleMessage, logConsoleError: logConsoleError, spawnProcess } = require('../tools/tools');

module.exports = async function runConsoleCommand(
	path,
	commandConfiguration,
	handleOutputMessage = logConsoleMessage,
	handleOutputError = logConsoleError,
	logColor = colors.FgCyan,
) {
	const { name, command, parameters } = commandConfiguration;
	const dirName = path.split('/').pop()
	const tag = `${dirName}-${name}`;
	return new Promise((resolve, reject) => {
		coloredLog(`[${tag}]: Running ${command} ${parameters.join(' ')}`, logColor);
		const installPackagesProcess = spawnProcess(path, command, parameters);
		installPackagesProcess.stdout.on('data', processOutput => { handleOutputMessage({ processOutput, path, commandConfiguration }); });
		installPackagesProcess.stderr.on('data', processOutput => { handleOutputError({ processOutput, path, commandConfiguration }); });
		installPackagesProcess.once('exit', () => { resolve(); });
		installPackagesProcess.once('error', () => { reject(); });
	});
}