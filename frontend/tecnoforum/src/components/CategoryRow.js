import React from 'react';
import { makeStyles, withStyles, TableRow, TableCell, Link } from '@material-ui/core';

import { TText } from './TText';

const StyledTableCell = withStyles((theme) => ({
	head: {
		backgroundColor: theme.palette.common.black,
		color: theme.palette.common.white
	},
	body: {
		fontSize: 14,
		verticalAlign:"text-top"
	},
}))(TableCell);
  
const StyledTableRow = withStyles((theme) => ({
	root: {
		'&:nth-of-type(odd)': {
			backgroundColor: theme.palette.action.hover,
		},
	},
}))(TableRow);

const useStyles = makeStyles((theme) => ({
	category: {
		"color": "inherit",
		"text-decoration": "none", 
		"&:hover":{
			"color": "blue"
		}
	},
	thread: {
		"text-decoration": "none",
		maxWidth: "300px",
		overflow: "hidden",
		textOverflow: "ellipsis"
	},
	description: {
		maxWidth: "600px"
	}
}));

export const CategoryRow = (props) => {
	const { categoryName, threads, id, description, latest } = props.item;
	const classes = useStyles();
	const latestThreads = latest && latest.map((thread) => {
		return (
			<React.Fragment key={thread.id}>
				<TText v="button"><a className={classes.thread} href={`/t/${thread.id}`} onClick={props.onClick}>{thread.threadName}</a></TText>
				<TText v="caption"><a className={classes.thread} href={`/u/${thread.user_id}`} onClick={props.onClick}>{thread.author}</a> / {thread.lastModified}</TText>
			</React.Fragment>
		);
	});
    return (
		<StyledTableRow>
			<StyledTableCell size="small" component="th" scope="row">
				<TText v="h6"><a className={classes.category} href={`/c/${id}`} onClick={props.onClick}>{categoryName}</a></TText>
				<TText v="caption" c="span"><div className={classes.description}>{description}</div></TText>
			</StyledTableCell>
			<StyledTableCell size="small" align="center">
				{threads ? threads.length : 0}
			</StyledTableCell>
			<StyledTableCell size="small">
				{latestThreads}
			</StyledTableCell>
		</StyledTableRow>
	);
}
