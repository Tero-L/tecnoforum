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
							<TableCell>Category</TableCell>
							<TableCell size="small" align="center">Threads</TableCell>
							<TableCell>Latests</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{categories}
						{/* <TableCell>Test</TableCell>
						<TableCell size="small" align="center">1</TableCell>
						<TableCell>jotain</TableCell> */}
					</TableBody>
				</Table>
			</TableContainer>
		</React.Fragment>
	);
}

export default withRouter(ListAllCategories);

// class ListAllCategories extends React.Component {
  
//   componentDidMount (){
//     this.props.dispatch(getCategories(this.props.token));
//   }

//   onClick = (event) => {
// 	// event.nativeEvent.stopImmediatePropagation();
// 	event.preventDefault();
// 	this.props.history.push(event.target.getAttribute("href"));
//   };
  
//   render() {
// 	const isLoading = this.props.loading && <Spinner />;
// 	let categories = this.props.categories.map((category) => {
// 		return <CategoryRow key={category.id} item={category} onClick={this.onClick} />;
// 	});
//     return (
//       <div>
//         {isLoading}
//         <Table basic='very' striped>
//           <Table.Header>
//             <Table.Row>
//               <Table.HeaderCell>Category</Table.HeaderCell>
// 			  <Table.HeaderCell collapsing>Threads</Table.HeaderCell>
//               <Table.HeaderCell textAlign='right'>Latests</Table.HeaderCell>
//             </Table.Row>
//           </Table.Header>
// 		  <Table.Body>{categories}</Table.Body>
//         </Table>
//       </div>
//     );
//   }

// }

// const mapStateToProps = (state) => {
//   return {
//     loading: state.login.loading,
//     token: state.login.token,
// 	categories: state.category.categories
//   };
// };