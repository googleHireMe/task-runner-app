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

export function ConsoleCommandsListComponent({ commands }) {
	return (
		<Paper>
			<Toolbar>
				<Typography variant="h6" component="div">
					Console commands
				</Typography>
			</Toolbar>
			<TableContainer component={Paper}>
				<Table size="small" aria-label="a dense table">
					<TableHead>
						<TableRow>
							<TableCell>Name</TableCell>
							<TableCell>Command</TableCell>
							<TableCell>Parameters</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{commands.map(({ name, command, parameters }) => (
							<TableRow key={name}>
								<TableCell>{name}</TableCell>
								<TableCell >{command}</TableCell>
								<TableCell >{!!parameters ? JSON.stringify(parameters) : 'none'}</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</Paper>
	);
}