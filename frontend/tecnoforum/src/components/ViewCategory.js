import React, {useState, useEffect} from 'react';
import { withRouter } from 'react-router-dom';
import { makeStyles, TableContainer, Table, TableBody, TableRow, TableHead, TableCell, Button } from '@material-ui/core';
import AddBoxIcon from '@material-ui/icons/AddBox';
import Pagination from '@material-ui/lab/Pagination';

import { useStateValue } from '../utils/StateProvider';
import { ThreadRow } from './ThreadRow';
import { getCategory, getThreads, clearCategories } from '../actions/categoryActions';
import { TText } from './TText';

const useStyles = makeStyles((theme) => ({
	header: {
		paddingTop: "20px",
		paddingBottom: "10px"
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

const ViewCategory = (props) => {
	const [page, setPage] = useState(1);

	useEffect(() => {
		if ( props.page )
			setPage(parseInt(props.page));
	}, []);

	const [{login, category}, dispatch] = useStateValue();

	useEffect(() => {
		getCategory(dispatch, login.token, props.id);
		getThreads(dispatch, login.token, props.id, page);
		return () => dispatch(clearCategories());
	}, []);

	const onClickThread = (event) => {
		event.preventDefault();
		props.history.push(`/t/${event.target.id}`);
	};

	const onClickUser = (event) => {
		event.preventDefault();
		
	};

	const onClickBreadcrum = (event) => {
		event.preventDefault();
		props.history.push(event.target.getAttribute("href"));
	}

	const handlePaginationChange = (e, p) => {
		props.history.replace(`/c/${props.id}/page-${p}`);
		getThreads(dispatch, login.token, props.id, p);
		setPage(p);
	}

	const classes = useStyles();
	const name = category.category ? category.category.categoryName : "Category";
	const pagination = category.threads && <Pagination shape="rounded"
		page={page}
		count={category.threads.pages}
		onChange={handlePaginationChange} />
	const threads = category.threads && category.threads.docs.map((thread) => {
		return <ThreadRow key={thread.id} item={thread} onClickThread={onClickThread} onClickUser={onClickUser} />;
	});
	console.log("did this rerender?");
	return (
		<React.Fragment>
			<TText v="caption"><a href={`/`} onClick={onClickBreadcrum}>Home</a> / {name}</TText>
			<TableContainer>
				<Table>
					<TableBody>
						<TableRow>
							<TableCell className={classes.header} padding="none">
								<TText v="h4">{name}</TText>
							</TableCell>
							<TableCell/>
						</TableRow>
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
									New Thread 
								</Button>
							</TableCell>
						</TableRow>
					</TableBody>
				</Table>
				<Table size="small">
					<TableHead>
						<TableRow>
							<TableCell>
								Thread
							</TableCell>
							<TableCell align="center" className={classes.tableCellCollapse}>
								Replies
							</TableCell>
							<TableCell align="center" className={classes.tableCellCollapse}>
								Views
							</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{threads}
					</TableBody>
				</Table>
			</TableContainer>
		</React.Fragment>
	);
}

export default withRouter(ViewCategory);