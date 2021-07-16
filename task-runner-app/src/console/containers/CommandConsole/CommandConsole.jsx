import React, { useEffect, useState } from 'react';
import config from 'task-runner-nvk-js/config/config-example.json';
// import config from 'task-runner-nvk-js/config/config-home.json';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { isConsoleCommand } from 'task-runner-nvk-js/tools/tools';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { useSelector, useDispatch } from 'react-redux'
import { decrement, updateLogsOfRunningCommand, updateRunningCommands } from '../../state/consoleSlice';

export function CommandConsoleComponent() {
	const runningCommands = useSelector(state => state.console.runningCommands)
  const dispatch = useDispatch();

	const allCommands = config.commandPresets;
	const awailableCommands = config.commandPresets.filter(command => !isConsoleCommand(command));
	const { desktopApi } = window;

	const [currentCommand, setCurrentCommand] = useState({});
	const [isCommandConsoleDisabled, setIsCommandConsoleDisabled] = useState(false);

	const runCommand = async () => {
		const commandToExecute = { ...currentCommand };
		setIsCommandConsoleDisabled(true);
		const processId = await desktopApi.invoke('run-command', { command: commandToExecute, allCommands });
		dispatch(updateRunningCommands({ ...currentCommand, processId }));
		setCurrentCommand({});
		setIsCommandConsoleDisabled(false);
	}

	const logData = (event, {
		processOutput,
		processExecutionPath,
		processId
	}) => dispatch(updateLogsOfRunningCommand({ processId, processExecutionPath, processOutput }));

	useEffect(() => {
		desktopApi.receive('log', (event, logObj) => {
			logData(event, logObj, runningCommands)
		});
	}, []);

	const killProcess = async (processId) => {
		await desktopApi.invoke('kill-process', processId);
	};

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
			{runningCommands?.map(runningCommand => (
				<Accordion key={runningCommand.name}>
					<AccordionSummary
						expandIcon={<ExpandMoreIcon />}
						// aria-controls="panel1a-content"
						// id="panel1a-header"
					>
						<Typography>{runningCommand.name}</Typography>
						<button onClick={() => killProcess(runningCommand.processId)}>KILL PROCESS</button>
					</AccordionSummary>
					<AccordionDetails>
						<Typography>
							{runningCommand?.logObjects?.map(logObject => (
								<div>
									<span style={{ color: 'red' }}>{logObject?.processExecutionPath}</span>
									<span>{logObject?.processOutput}</span>
								</div>
							))}
						</Typography>
					</AccordionDetails>
				</Accordion>
			))}
		</>

	);
}