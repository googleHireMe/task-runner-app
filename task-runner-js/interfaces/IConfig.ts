export type Task = CommandPreset | ConsoleCommand;

export interface Config {
	commandPresets: Task[];
}

export interface ConsoleCommand {
	name: string;
	command: string;
	parameters?: string[];
	isConsoleCommand: true;
}

export interface CommandPreset {
	name: string;
	path?: string;
	commands?: Subtask[];
	shouldRunCommandsInParallel?: boolean;
}

export interface Subtask { 
	name: string;
}