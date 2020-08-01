import React from 'react';
import { withRouter } from 'react-router-dom';

import { makeStyles, Table, TableBody, TableRow, TableCell, Paper } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';

import { useStateValue } from '../utils/StateProvider';

const useStyles = makeStyles((theme) => ({
	root: {
		padding:"10px",
		marginBottom:"14px",
		WebkitBoxShadow: `0 1px 2px 0 rgba(34,36,38,.15)`,
		boxShadow: `0 1px 2px 0 rgba(34,36,38,.15)`
	},
	card: {
		WebkitBoxShadow: `0 1px 2px 0 rgba(34,36,38,.15)`,
		boxShadow: `0 1px 2px 0 rgba(34,36,38,.15)`,
		width:"280px"
	},
	tableCell: {
		padding: "0px",
		paddingRight: "10px",
		width: "1px",
		borderBottom: `0px solid`,
		verticalAlign: "top"
	},
	tableCellContent: {
		padding: "0px",
		borderLeft: `1px solid ${theme.palette.divider}`,
		borderBottom: `0px solid`,
		paddingLeft: "10px",
		verticalAlign: "top",
		whiteSpace: "pre-wrap"
	},
	tableCellBar: {
		paddingBottom: "10px",
		position: "relative",
		opacity: "0.45"
	},
	tableCellBarButton: {
		position: "absolute",
		right: "0px"
	}
}));

const CommentRow = (props) =>
{
	const [{login}] = useStateValue();
	const { comment, id, author, user_id, date, thread_id } = props.item;
	const isThread = props.isThread;
	const tUrl = `/t/${thread_id}/`;
	const editAndRemove = !( login.isLogged && ( login.user.userType === "admin" || login.user.id === user_id ) ) ? "" : 
	(
		!isThread ? 
		<React.Fragment><a href="">Remove</a> / <a href={`${tUrl}edit-comment/${id}`} onClick={props.onClickCommentModify}>Edit</a> /</React.Fragment> :
		<React.Fragment><a href="">Remove</a> / <a href={`${tUrl}edit-thread`} onClick={props.onClickCommentModify}>Edit</a> /</React.Fragment>
	);
	const classes = useStyles();
	console.log("did this rerender?");
	return (
		<Paper variant="outlined" className={classes.root}>
			<Table>
				<TableBody padding="none">
					<TableRow>
						<TableCell className={classes.tableCell}>
							<Card variant="outlined" className={classes.card}>
								<CardHeader
									avatar={
										<Avatar aria-label="recipe">
											R
										</Avatar>
									}
									// action={
									// 	<IconButton aria-label="settings">
									// 		<MoreVertIcon />
									// 	</IconButton>
									// }
									title={author}
									// subheader=""
								/>
							</Card>
						</TableCell>
						<TableCell className={classes.tableCellContent}>
							<div className={classes.tableCellBar}>
								<div className={classes.tableCellBarButton}>
									{editAndRemove} <a href={`${tUrl}new-comment/thread`} onClick={props.onClickCommentModify}>Reply</a>
								</div>
								Created {date} {/* - Modified {modified_date}*/}
							</div>
							{comment}
						</TableCell>
					</TableRow>
				</TableBody>
			</Table>
		</Paper>
	);
}

export default withRouter(CommentRow);
