import React from 'react';
import { makeStyles, TextField, Button, Paper, Box } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';

import { TText } from './TText';

const useStyles = makeStyles((theme) => ({
	root: {
		paddingTop: "20px"
	},
	paper: {
		marginTop: "10px",
		padding: "10px",
		marginBottom:"14px",
		border: `1px solid ${theme.palette.divider}`,
		WebkitBoxShadow: `0 1px 2px 0 rgba(34,36,38,.15)`,
		boxShadow: `0 1px 2px 0 rgba(34,36,38,.15)`
	},
	textField: {
		paddingBottom: '10px',
		width: '100%'
	},
	alert: {
		marginBottom: '10px',
	}
}));

export default function ThreadForm (props) {
	const onClickBreadcrum = (event) => {
		event.preventDefault();
		props.history.push(event.target.getAttribute("href"));
	}

	const classes = useStyles();
	const { titleFail, commentFail, title, comment } = props.form;
	console.log("did this rerender?");
	return (
		<React.Fragment>
			<TText v="caption">
				<a href={`/`} onClick={onClickBreadcrum}>Home</a> / <a href={`/c/${props.id}`} onClick={onClickBreadcrum}>{props.categoryName}</a>
				{props.editThread && <React.Fragment>{" / "}<a href={`/t/${props.thread_id}`} onClick={onClickBreadcrum}>{title}</a></React.Fragment>} / {props.header}
			</TText>
			<Box className={classes.root}>
				<TText v="h4">{props.header}</TText>
				<Paper className={classes.paper}>
					<form onSubmit={props.onSubmit}>
						{titleFail && <Alert severity="error" className={classes.alert}>Title must not be empty or less than 4 letters</Alert>}
						<TextField label="Title" name="title" required variant="outlined" className={classes.textField}
						onChange={props.onChange} value={title}/><br/>
						{commentFail && <Alert severity="error" className={classes.alert}>Comment must not be empty</Alert>}
						<TextField label="Comment" name="comment" required variant="outlined" className={classes.textField}
						onChange={props.onChange} multiline={true} rows={12}>{comment}</TextField>
					</form>
					<Button variant="contained" onClick={props.onSubmit} disableElevation>Submit</Button>
				</Paper>
			</Box>
		</React.Fragment>
	);
}
