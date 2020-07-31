import React, {useState, useEffect} from 'react';
import { withRouter } from 'react-router-dom';
import { makeStyles, TableContainer, Table, TableBody, TableRow, TableHead, TableCell, Button, Paper } from '@material-ui/core';
import AddBoxIcon from '@material-ui/icons/AddBox';
import Pagination from '@material-ui/lab/Pagination';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';

import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import { useStateValue } from '../utils/StateProvider';
import CommentRow from './CommentRow';
import { getThread, getComments, clearThreadAndComments } from '../actions/threadActions';
import { TText } from './TText';

const useStyles = makeStyles((theme) => ({
	headerTitle: {
		padding: "0px",
		borderBottom: `0px solid ${theme.palette.divider}`,
		paddingTop: "20px",
		paddingBottom: "10px",
		whiteSpace: "nowrap"
	},
	headerDescription: {
		padding: "0px",
		whiteSpace: "pre-wrap"
	},
	bottomHeader: {
		borderBottom: `0px solid ${theme.palette.divider}`,
		paddingTop: "10px",
		paddingBottom: "30px",
		padding: "0px"
	},
	bottomButtonHeader: {
		borderBottom: `0px solid ${theme.palette.divider}`,
		paddingTop: "10px",
		paddingBottom: "30px",
		padding: "0px",
		textAlign: "end"
	},
	tableCellCollapse: {
		width: "1px"
	}
}));

const ViewThread = (props) => {
	const [page, setPage] = useState(1);
	const [{login, category, thread}, dispatch] = useStateValue();

	useEffect(() => {
		let p = props.page ? parseInt(props.page) : page;
		getThread(dispatch, login.token, props.id, true);
		getComments(dispatch, login.token, props.id, p);
		setPage(parseInt(p));
		return () => dispatch(clearThreadAndComments());
	}, []);

	const onClickBreadcrum = (event) => {
		event.preventDefault();
		props.history.push(event.target.getAttribute("href"));
	}

	const onClickCommentModify = (event) => {
		event.preventDefault();
		props.history.push(event.target.getAttribute("href"));
	}

	const handlePaginationChange = (e, p) => {
		props.history.replace(`/t/${props.id}/page-${p}`);
		getComments(dispatch, login.token, props.id, p);
		setPage(p);
	}

	const classes = useStyles();
	const categoryLoaded = category.category && thread.thread && thread.thread.category_id === category.category.id;
	const categoryID = categoryLoaded ? category.category.id : 0;
	const categoryName = categoryLoaded ? category.category.categoryName : "Category";
	const threadName = thread.thread ? thread.thread.threadName : "Thread";
	const comments = thread.comments && thread.comments.docs.map((comment) => {
		return <CommentRow 
			key={comment.id} 
			item={comment} 
			isThread={false} 
			onClickCommentModify={onClickCommentModify} />;
	});
	const pagination = thread.comments && <Pagination shape="rounded"
		page={page}
		count={thread.comments.pages}
		onChange={handlePaginationChange} />
	const threadComment = !thread.thread ? {} : {
		comment: thread.thread.description,
		author: thread.thread.author,
		thread_id: thread.thread.id,
		user_id: thread.thread.user_id,
		date: thread.thread.date
	};
	console.log("did this render?");
	return (
		<React.Fragment>
			<TText v="caption">
				<a href={`/`} onClick={onClickBreadcrum}>Home</a> / <a href={`/c/${categoryID}`} onClick={onClickBreadcrum}>{categoryName}</a> / {threadName}
			</TText>
			<TableContainer>
				<Table>
					<TableBody>
						<TableRow>
							<TableCell className={classes.headerTitle}>
								<TText v="h4">{threadName}</TText>
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell className={classes.headerDescription}>
								<CommentRow 
									item={threadComment} 
									isThread={true}  
									onClickCommentModify={onClickCommentModify} 
								/>
							</TableCell>
						</TableRow>
					</TableBody>
				</Table>
				<Table>
					<TableBody>
						<TableRow>
							<TableCell className={classes.bottomHeader}>
								{pagination}
							</TableCell>
							<TableCell className={classes.bottomButtonHeader}>
								<Button 
									variant="contained" 
									disableElevation 
									endIcon={<AddBoxIcon />}
										disabled={!login.isLogged}
									onClick={() => props.history.push(`/c/${props.id}/new-thread/`)}>
									New Comment 
								</Button>
							</TableCell>
						</TableRow>
					</TableBody>
				</Table>
			</TableContainer>
			{comments}
		</React.Fragment>
	);
}

export default withRouter(ViewThread);