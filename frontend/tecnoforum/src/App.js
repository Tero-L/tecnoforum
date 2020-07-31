import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { Container } from '@material-ui/core';

import { useStateValue } from './utils/StateProvider';
import NavBar from './components/NavBar';
import ListAllCategories from './components/ListAllCategories';
import ViewCategory from './components/ViewCategory';
import ViewThread from './components/ViewThread';
import NewThread from './components/NewThread';
import EditThread from './components/EditThread';
import NewComment from './components/NewComment';
import EditComment from './components/EditComment';

const App = ({ history, match }) => {
	const [{login}] = useStateValue();
	console.log("did this rerender?");
	return (
		<React.Fragment>
			<NavBar/>
			<Container maxWidth="lg" style={{ 'paddingTop': '70px' }}>
				<Switch>
					<Route exact path='/c/:id' render={({match}) => <ViewCategory id={match.params.id} />} />
					<Route exact path='/c/:id/page-:page' render={({match}) => <ViewCategory id={match.params.id} page={match.params.page} />} />
					<Route exact path='/c/:id/new-thread' render={({match}) => (!login.isLogged ? <Redirect to='/' /> : <NewThread id={match.params.id} />)} />
					<Route exact path='/t/:id' render={({match}) => <ViewThread id={match.params.id} />} />
					<Route exact path='/t/:id/page-:page' render={({match}) => <ViewThread id={match.params.id} page={match.params.page} />} />
					<Route exact path='/t/:id/edit-thread' render={({match}) => (!login.isLogged ? <Redirect to='/' /> : <EditThread id={match.params.id} />)} />
					<Route exact path='/t/:id/new-comment' render={({match}) => (!login.isLogged ? <Redirect to='/' /> : <NewComment id={match.params.id} history={history} />)} />
					<Route exact path='/t/:id/edit-comment/:comment_id' render={({match}) => 
						(!login.isLogged ? <Redirect to='/' /> : <EditComment id={match.params.id} comment_id={match.params.comment_id} history={history} />)} />
					<Route render={() => <ListAllCategories/>} />
				</Switch>
				{/* 
				<Route exact path='/users/' render={() => <ListAllUsers />} />
				<Route exact path='/t/:id/new-comment' render={({match}) => <NewComment id={match.params.id} history={history} />} />
				<Route exact path='/t/:id/edit-comment/:comment_id' render={({match}) => <EditComment id={match.params.id} comment_id={match.params.comment_id} history={history} />} />
				*/}
			</Container>
		</React.Fragment>
	);
};

// {/* <Route exact path='/user/:name' render={(props) => <GetUser name={match.params.name} />} /> */}

export default withRouter(App);
