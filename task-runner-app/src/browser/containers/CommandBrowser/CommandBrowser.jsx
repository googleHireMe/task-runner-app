import { isConsoleCommand } from 'task-runner-nvk-js/tools/tools';
import { ComplexCommandsListComponent } from '../../components/ComplexCommandsList/ComplexCommandsList';
import { ConsoleCommandsListComponent } from '../../components/ConsoleCommandsList/ConsoleCommandsList';
import config from 'task-runner-nvk-js/config/config-example.json';

export function CommandBrowserComponent() {
	const awailableCommands = config.commandPresets;
	const consoleCommands = [];
	const complexCommands = [];
	awailableCommands.forEach(command => {
		isConsoleCommand(command)
			? consoleCommands.push(command)
			: complexCommands.push(command)
	});

	return (
		<>
			<ConsoleCommandsListComponent
				commands={consoleCommands}
			/>
			<ComplexCommandsListComponent
				commands={complexCommands}
			/>
		</>
	);
}