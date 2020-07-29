import React, {useEffect} from 'react';
import { withRouter } from 'react-router-dom';
import { makeStyles, Paper, TableContainer, Table, TableBody, TableRow, TableHead, TableCell } from '@material-ui/core';

import { CategoryRow } from './CategoryRow';
// import Spinner from './Spinner';
import { getCategories } from '../actions/categoryActions';
import { useStateValue } from '../utils/StateProvider';

const ListAllCategories = (props) => {
	const [{login, category}, dispatch] = useStateValue();
	useEffect(() => {
		getCategories(dispatch, login.token);
	}, []);

	const onClick = (event) => {
		// event.nativeEvent.stopImmediatePropagation();
		event.preventDefault();
		props.history.push(event.target.getAttribute("href"));
	};

	console.log("did this rerender?");
	const categories = category.categories.map((category) => {
		return <CategoryRow key={category.id} item={category} onClick={onClick} />;
	});
	return (
		<React.Fragment>
			<TableContainer>
				<Table aria-label="simple table">
					<TableHead>
						<TableRow>
							<TableCell size="small">Category</TableCell>
							<TableCell size="small" align="center">Threads</TableCell>
							<TableCell size="small">Latests</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{categories}
					</TableBody>
				</Table>
			</TableContainer>
		</React.Fragment>
	);
}

export default withRouter(ListAllCategories);