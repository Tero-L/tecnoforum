import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { makeStyles, TextField, Button, Paper } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';

import { onLogin } from '../actions/loginActions';
import { useStateValue } from '../utils/StateProvider';

const useStyles = makeStyles((theme) => ({
	root: {
		width: 'fit-content',
		padding: '20px',
		"align-items": 'center'
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
	const [{login}, dispatch] = useStateValue();
	const [loginForm, setloginForm] = useState({
		username:"",
		password:""
	});

	const onChange = (event) => {
		setloginForm({
			...loginForm,
			[event.target.name]:event.target.value
		})
	};
	
	const onSubmit = (event) => {
		event.preventDefault();
		
		let user = {
			email: loginForm.username,
			password: loginForm.password
		}
	
		onLogin(dispatch, user, props.history);
	};

	// const isLoading = .props.loading && <Spinner />;
	const classes = useStyles();
	const fail = login.error.length > 0 && (<React.Fragment>
			<Alert severity="error" className={classes.alert}>
				<AlertTitle>Login was unsuccessful</AlertTitle>
				{login.error}
			</Alert>
			<br/>
		</React.Fragment>);
	console.log("did this rerender?");
	return (
		<React.Fragment>
			<center>
				<Paper elevation={1} className={classes.root}>
					{fail}
					<form>
						<TextField label="Email" name="username" type="email" required variant="outlined" 
							className={classes.input} onChange={onChange}/>
						<br/>
						<TextField label="Password" name="password" type="password" required variant="outlined" 
							className={classes.input} onChange={onChange}/>
						<br/>
					</form>
					<Button variant="contained" onClick={onSubmit}>Log In</Button>
				</Paper>
			</center>
		</React.Fragment>
	);
}

export default withRouter(Login);