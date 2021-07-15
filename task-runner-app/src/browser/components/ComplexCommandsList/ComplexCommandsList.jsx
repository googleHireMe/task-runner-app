import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

export function ComplexCommandsListComponent({ commands }) {

	return (
		<Paper>
			<Toolbar>
				<Typography variant="h6" component="div">
					Complex commands
				</Typography>
			</Toolbar>
			<TableContainer component={Paper}>
				<Table size="small" aria-label="a dense table">
					<TableHead>
						<TableRow>
							<TableCell>Name</TableCell>
							<TableCell>Path</TableCell>
							<TableCell>Will execute commands</TableCell>
							<TableCell>Run in parallel</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{commands.map(({ name, path, commands, shouldRunCommandsInParallel }) => (
							<TableRow key={name}>
								<TableCell>{name}</TableCell>
								<TableCell >{!!path ? path : 'none'}</TableCell>
								<TableCell >{JSON.stringify(commands.map(({ name }) => name))}</TableCell>
								<TableCell >{shouldRunCommandsInParallel === true ? 'Yes' : 'No'}</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</Paper>
	)
}