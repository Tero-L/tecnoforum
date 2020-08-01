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
	tableCellCollapse: {
		width: "1px"
	}
}));

export const ThreadRow = (props) => {
	const { threadName, comments, id, author, user_id, date } = props.item;
	const classes = useStyles();
    return (
		<StyledTableRow>
			<StyledTableCell component="th" scope="row">
				<TText v="h6">
					<a className={classes.category} href={`/t/${id}`} id={id} onClick={props.onClickThread}>{threadName}</a>
				</TText>
				<TText v="caption" c="span">
					<a href="" id={user_id} onClick={props.onClickUser}>{author}</a> / {date}
				</TText>
			</StyledTableCell>
			<StyledTableCell align="right" className={classes.tableCellCollapse}>
				{comments ? comments.length : 0}
			</StyledTableCell>
			<StyledTableCell align="right" className={classes.tableCellCollapse}>
				0
			</StyledTableCell>
		</StyledTableRow>
	);
}