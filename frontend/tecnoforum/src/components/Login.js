import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { makeStyles, TextField, Button, Paper, Tabs, Tab, Box } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';

import { onRegister } from '../actions/registerActions';
import { onLogin } from '../actions/loginActions';
import { useStateValue } from '../utils/StateProvider';
import { TText } from './TText';

function TabPanel(props) {
	const { children, value, index } = props;
  
	return (
		<div
			role="tabpanel"
			hidden={value !== index}>
			{value === index && (
				<Box p={3}>
					<TText c="span">{children}</TText>
				</Box>
			)}
		</div>
	);
}

const useStyles = makeStyles((theme) => ({
	root: {
		'z-index': '1000',
  		position: 'absolute',
		width: '400px',
		height: '450px',
		padding: '20px',
		"align-items": 'center',
		top: '50%',
		left: '50%',
		'margin-top': '-225px',
		'margin-left': '-200px'
	},
	box: {
		height: "450px"
	},
	tabs: {
		height: "50px"
	},
	content: {
		height: "400px",
		"overflow-y": "auto"
	},
	input: {
		paddingBottom: '10px',
		"text-align": 'left'
	},
	alert: {
		"text-align": 'left'
	}
}));

const Login = (props) => {
	const [{login, register}, dispatch] = useStateValue();
	useEffect(() => {
		if (login.isLogged)
			props.closeLoginBar();
	}, [login.isLogged]);
	const [tab, setTab] = useState(0);
	useEffect(() => {
		setTab(props.tab);
	}, [props.tab]);
	const [loginForm, setloginForm] = useState({
		username:"",
		password:"",
		nickname:""
	});

	const handleChange = (event, newValue) => {
		props.openCloseLoginBar (newValue);
		setTab(newValue);
	};

	const onChange = (event) => {
		setloginForm({
			...loginForm,
			[event.target.name]:event.target.value
		})
	};
	
	const onLoginSubmit = (event) => {
		event.preventDefault();
		let user = {
			email: loginForm.username,
			password: loginForm.password
		}
		onLogin(dispatch, user, props.history);
	};

	const onRegisterSubmit = (event) => {
		event.preventDefault();
		let user = {
			email: loginForm.username,
			password: loginForm.password,
			nickname: loginForm.nickname
		}
		onRegister(dispatch, user, props.history);
	};

	// const isLoading = .props.loading && <Spinner />;
	const classes = useStyles();

	const loginFail = login.error.length > 0 && (<React.Fragment>
		<Alert severity="error" className={classes.alert}>
			<AlertTitle>Login was unsuccessful</AlertTitle>
			{login.error}
		</Alert>
		<br/>
	</React.Fragment>);
	const registerSuccess = register.success && (<React.Fragment>
		<Alert severity="success" className={classes.alert}>
			Registration was successful, you may now login.
		</Alert>
		<br/>
	</React.Fragment>);
	const registerFail = register.error.length > 0 && (<React.Fragment>
		<Alert severity="error" className={classes.alert}>
			<AlertTitle>Registration was unsuccessful</AlertTitle>
			{register.error}
		</Alert>
		<br/>
	</React.Fragment>);

	console.log("did this rerender?");
	return (
		<React.Fragment>
			<div className={classes.root}>
				<Paper elevation={1} square className={classes.box}>
					<Tabs indicatorColor="primary" textColor="primary" variant="fullWidth" value={tab} onChange={handleChange} className={classes.tabs}>
						<Tab label="Register" id='0'/>
						<Tab label="Login" id='1'/>
					</Tabs>
					<center className={classes.content}>
						<TabPanel value={tab} index={0}>
							{registerSuccess || registerFail}
							<form>
								<TextField label="Email" name="username" type="email" required variant="outlined" 
									className={classes.input} onChange={onChange}/>
								<br/>
								<TextField label="Nickname" name="nickname" required variant="outlined" 
									className={classes.input} onChange={onChange}/>
								<br/>
								<TextField label="Password" name="password" type="password" required variant="outlined" 
									className={classes.input} onChange={onChange}/>
								<br/>
							</form>
							<Button variant="contained" onClick={onRegisterSubmit}>Register</Button>
						</TabPanel>
						<TabPanel value={tab} index={1}>
							{loginFail}
							<form>
								<TextField label="Email" name="username" type="email" required variant="outlined" 
									className={classes.input} onChange={onChange}/>
								<br/>
								<TextField label="Password" name="password" type="password" required variant="outlined" 
									className={classes.input} onChange={onChange}/>
								<br/>
							</form>
							<Button variant="contained" onClick={onLoginSubmit}>Log In</Button>
						</TabPanel>
					</center>
				</Paper>
			</div>
		</React.Fragment>
	);
}

export default withRouter(Login);