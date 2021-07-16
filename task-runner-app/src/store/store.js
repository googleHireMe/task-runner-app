import { configureStore } from '@reduxjs/toolkit'
import counterReducer from '../console/state/consoleSlice';

export const store = configureStore({
  reducer: {
		console: counterReducer
	},
})