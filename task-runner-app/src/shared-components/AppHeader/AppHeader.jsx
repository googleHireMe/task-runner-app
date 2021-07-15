import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import { Link as RouterLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	root: {
		'& > * + *': {
			marginLeft: theme.spacing(2),
		},
	},
}));

export function AppHeader({ routes }) {
	const classes = useStyles();
	return (
		<div>
			<AppBar color={'default'} position="static">
				<Toolbar>
					<Typography className={classes.root} >
						{routes.map(({ route, description }) => (
							<Link component={RouterLink}
								key={description}
								to={route}
								color={'textPrimary'}
							>
								{description}
							</Link>
						))}
					</Typography>
				</Toolbar>
			</AppBar>
		</div>
	);
}