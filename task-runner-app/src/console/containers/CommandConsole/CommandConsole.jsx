import React, { useEffect, useState } from 'react';
import config from 'task-runner-nvk-js/config/config-example.json';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { isConsoleCommand } from 'task-runner-nvk-js/tools/tools';

export function CommandConsoleComponent() {
	const allCommands = config.commandPresets;
	const awailableCommands = config.commandPresets.filter(command => !isConsoleCommand(command));

	const [desktopApi, setDesktopApi] = useState(null); 
	useEffect(() => {
		setDesktopApi(window.desktopApi);
	}, []);

	const [currentCommand, setCurrentCommand] = useState({});
	const [isCommandConsoleDisabled, setIsCommandConsoleDisabled] = useState(false);

	const runCommand = async () => {
		const commandToExecute = { ...currentCommand };
		setTimeout(() => { setIsCommandConsoleDisabled(true); }, 0);
		const result = await desktopApi.invoke('run-command', { command: commandToExecute, allCommands });
		setCurrentCommand({});
	}
	const handleKeyDown = async (event) => {
		if (event.key === 'Enter') {
			await runCommand();
		}
	}

	return (
		<>
			<Autocomplete
				disabled={isCommandConsoleDisabled}
				value={currentCommand}
				onChange={(event, newValue) => { setCurrentCommand(newValue); }}
				options={awailableCommands}
				getOptionLabel={command => command.name ?? ''}
				style={{ width: 300 }}
				renderInput={(params) => <TextField {...params} label="Combo box" variant="outlined" onKeyDown={handleKeyDown} />}
			/>
		</>
	);
}