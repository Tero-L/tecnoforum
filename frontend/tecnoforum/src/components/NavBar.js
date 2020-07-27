import React from 'react';
import { withRouter } from 'react-router-dom';
import { makeStyles, Toolbar, AppBar, ButtonGroup, Button } from '@material-ui/core';

import { onLogout } from '../actions/loginActions';
import { useStateValue } from '../utils/StateProvider';
import { TText } from './TText';
// import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles((theme) => ({
	toolbar: {
		backgroundColor: `white`,
		borderBottom: `1px solid ${theme.palette.divider}`,
		position: 'fixed',
		width: `auto`,
		left:`40px`,
		right:`40px`,
	},
	ButtonGroup: {
		'position': 'absolute', 
		'right': '0px'
	}
}));

const NavBar = (props) => {
	const [{login}, dispatch] = useStateValue();

	const loginBar = () => {
		return (
			<ButtonGroup variant="text" color="inherit" aria-label="text primary button group" className={classes.ButtonGroup}>
				<Button onClick={() => props.history.push('/register')}>Register</Button>
				<Button onClick={() => props.history.push('/login')}>Login</Button>
			</ButtonGroup>
		);
	}

	const loggedInBar = () => {
		return (
			<ButtonGroup variant="text" color="inherit" aria-label="text primary button group" className={classes.ButtonGroup}>
				<Button onClick={() => props.history.push('/')}>Welcome {login.user.nickname}</Button>
				<Button onClick={() => {onLogout(dispatch, login.token)}}>Logout</Button>
			</ButtonGroup>
		);
	}

	const classes = useStyles();
	console.log("did this rerender?");
	return (
		<Toolbar variant="dense" className={classes.toolbar}>
			<img src={process.env.PUBLIC_URL + '/TF_logo.gif'} />
			{login.isLogged ? loggedInBar() : loginBar()}
		</Toolbar>
	);
}

export default withRouter(NavBar);