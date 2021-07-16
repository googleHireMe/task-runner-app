import { createSlice, PayloadAction } from '@reduxjs/toolkit'
const initialState = {
	runningCommands: [],
}

export const consoleSlice = createSlice({
	name: 'counter',
	initialState,
	reducers: {
		updateRunningCommands: (state, action) => {
			state.runningCommands.push(action.payload);
		},
		updateLogsOfRunningCommand: (state, { payload }) => {
			const { processId, processExecutionPath, processOutput, commandConfiguration, isError } = payload;
			console.log('isError redux', isError);
			const commandOwningLog = state.runningCommands.find(command => command.processId === processId);
			if (commandOwningLog) {
				if (!commandOwningLog.logObjects) { commandOwningLog.logObjects = []; }
				commandOwningLog.logObjects.push({ processExecutionPath, processOutput, commandConfiguration, isError });
			}
		},
		incrementByAmount: (state, action) => {
			state.value += action.payload
		},
	},
})

// Action creators are generated for each case reducer function
export const {
	updateRunningCommands,
	updateLogsOfRunningCommand,
	incrementByAmount
} = consoleSlice.actions

export default consoleSlice.reducer