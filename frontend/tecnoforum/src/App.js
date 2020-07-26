import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { Container } from '@material-ui/core';

import NavBar from './components/NavBar';

const App = ({ history, match }) => {
	console.log("did this rerender?");
	return (
		<React.Fragment>
		<NavBar/>
		<Container maxWidth="md">
			<div style={{ 'paddingTop': '100px' }}>
		{/* <Container style={{ 'paddingTop': '100px' }}>
			<Switch>
			<Route exact path='/users/' render={() => <ListAllUsers />} />
			<Route exact path='/register/'render={() => (isLogged ? <Redirect to='/' /> : <Registration history={history} />)}/>
			<Route exact path='/login/' render={() => (isLogged ? <Redirect to='/' /> : <Login history={history} />)} />
			<Route exact path='/c/:id' render={({match}) => <ViewCategory id={match.params.id} history={history} />} />
			<Route exact path='/c/:id/page-:page' render={({match}) => <ViewCategory id={match.params.id} page={match.params.page} history={history} />} />
			<Route exact path='/c/:id/new-thread' render={({match}) => <NewThread id={match.params.id} history={history} />} />
			<Route exact path='/t/:id' render={({match}) => <ViewThread id={match.params.id} history={history} />} />
			<Route exact path='/t/:id/page-:page' render={({match}) => <ViewThread id={match.params.id} page={match.params.page} history={history} />} />
			<Route exact path='/t/:id/edit-thread' render={({match}) => <EditThread id={match.params.id} history={history} />} />
			<Route exact path='/t/:id/new-comment' render={({match}) => <NewComment id={match.params.id} history={history} />} />
			<Route exact path='/t/:id/edit-comment/:comment_id' render={({match}) => <EditComment id={match.params.id} comment_id={match.params.comment_id} history={history} />} />
			<Route render={() => <ListAllCategories history={history} />} />
			</Switch>
		</Container> */}
			</div>
		</Container>
		</React.Fragment>
	);
};

// {/* <Route exact path='/user/:name' render={(props) => <GetUser name={match.params.name} />} /> */}

export default withRouter(App);
