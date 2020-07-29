import React, {useState} from 'react';
import { withRouter } from 'react-router-dom';
import { makeStyles, Toolbar, ButtonGroup, Button } from '@material-ui/core';

import Login from './Login';
import { onLogout } from '../actions/loginActions';
import { useStateValue } from '../utils/StateProvider';
// import { TText } from './TText';
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

	const [loginBar, setLoginBar] = useState({
		showLoginBar: false,
		tab: 1
	});

	const onClickImage = (event, dest) => {
		event.preventDefault();
		closeLoginBar();
		props.history.push(dest);
	}

	const openCloseLoginBar = (tab) => {
		if(tab !== loginBar.tab)
		{
			setLoginBar({showLoginBar: true, tab:tab});
			return;
		}
		
		setLoginBar({showLoginBar: !loginBar.showLoginBar, tab:tab});
	}

	const closeLoginBar = () => {
		setLoginBar({showLoginBar: false, tab:0});
	}

	const buttonGroup = () => {
		if (login.isLogged)
		{
			return (
				<ButtonGroup variant="text" color="inherit" aria-label="text primary button group" className={classes.ButtonGroup}>
					<Button onClick={() => props.history.push('/')}>Welcome {login.user.nickname}</Button>
					<Button onClick={() => {onLogout(dispatch, login.token)}}>Logout</Button>
				</ButtonGroup>
			);
		}

		return (
			<ButtonGroup variant="text" color="inherit" aria-label="text primary button group" className={classes.ButtonGroup}>
				<Button onClick={() => openCloseLoginBar(0)}>Register</Button>
				<Button onClick={() => openCloseLoginBar(1)}>Login</Button>
			</ButtonGroup>
		);
	}

	const classes = useStyles();
	console.log("did this rerender?");
	return (
		<React.Fragment>
			<Toolbar variant="dense" className={classes.toolbar}>
				<a href="/" onClick={(e) => onClickImage (e, "/")}><img src={process.env.PUBLIC_URL + '/TF_logo.gif'} /></a>
				{buttonGroup()}
			</Toolbar>
			{loginBar.showLoginBar && <Login tab={loginBar.tab} openCloseLoginBar={openCloseLoginBar} closeLoginBar={closeLoginBar}/>}
		</React.Fragment>
	);
}

export default withRouter(NavBar);