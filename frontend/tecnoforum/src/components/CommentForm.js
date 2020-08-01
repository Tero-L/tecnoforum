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

export default function CommentForm (props) {
	const onClickBreadcrum = (event) => {
		event.preventDefault();
		props.history.push(event.target.getAttribute("href"));
	}

	const classes = useStyles();
	const { commentFail, comment } = props.form;
	const categoryName = props.category ? props.category.categoryName : "Category";
	const threadLink = `/t/${props.thread.id}`;
	console.log("did this rerender?");
	return (
		<React.Fragment>
			<TText v="caption">
				<a href={`/`} onClick={onClickBreadcrum}>Home</a> / <a href={`/c/${props.thread.category_id}`} onClick={onClickBreadcrum}>{categoryName}</a>
				<React.Fragment>{" / "}<a href={threadLink} onClick={onClickBreadcrum}>{props.thread.threadName}</a></React.Fragment> / {props.header}
			</TText>
			<Box className={classes.root}>
				<TText v="h4">{props.header}</TText>
				<Paper className={classes.paper}>
					<form onSubmit={props.onSubmit}>
						{commentFail && <Alert severity="error" className={classes.alert}>Comment must not be empty</Alert>}
						<TextField label="Comment" name="comment" required variant="outlined" className={classes.textField}
						onChange={props.onChange} multiline={true} rows={12} value={comment}>{comment}</TextField>
					</form>
					<Button variant="contained" onClick={props.onSubmit} disableElevation>Submit</Button>
				</Paper>
			</Box>
		</React.Fragment>
	);
}