import React from 'react';
import { makeStyles, withStyles, TableRow, TableCell } from '@material-ui/core';

import { TText } from './TText';

const StyledTableCell = withStyles((theme) => ({
	head: {
		backgroundColor: theme.palette.common.black,
		color: theme.palette.common.white,
	},
	body: {
		fontSize: 14,
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
	root: {
		"text-decoration": "none", 
		"color": "inherit"
	}
}));

export const CategoryRow = (props) => {
	const { categoryName, threads, id, description } = props.item;
	const classes = useStyles();
    return (
		<StyledTableRow>
			<StyledTableCell component="th" scope="row">
				<TText v="h6"><a className={classes.root} href={`/c/${id}`} onClick={props.onClick}>{categoryName}</a></TText>
				{description}
			</StyledTableCell>
			<StyledTableCell size="small" align="center">
				{threads ? threads.length : 0}
			</StyledTableCell>
			<StyledTableCell>
				-
			</StyledTableCell>
		</StyledTableRow>
	);
}
