import React, {useState, useEffect} from 'react';
import { withRouter } from 'react-router-dom';

import { newComment, getThread } from '../actions/threadActions';
import { useStateValue } from '../utils/StateProvider';
import CommentForm from './CommentForm';

const NewComment = (props) => {
	const [{login, category, thread}, dispatch] = useStateValue();
	const [form, setForm] = useState({
		comment: '',
		commentFail: false,
		threadLoaded: false,
		loadingthread: false
	});

	useEffect(() => {
		if (thread.thread !== null && form.threadLoaded === false)
			setForm({...form, threadLoaded:true});
	}, [thread.thread, form.loadingthread]);

	useEffect(() => {
		getThread(dispatch, login.token, props.id, true);
		setForm({...form, loadingthread:true});
	}, []);

	const onChange = (event) => {
		setForm({
			...form,
			[event.target.name]: event.target.value,
			[`${event.target.name}Fail`]: false
		})
	};

	const onSubmit = (event) => {
		event.preventDefault();

		if (form.comment.length === 0)
		{
			setForm({...form, commentFail:true});
			return;
		}
		
		const comment = {
			comment: form.comment,
			thread_id: thread.thread.id
		}

		newComment(dispatch, login.token, comment, props.history);
	};

	console.log("did this rerender?");
	return (
		<React.Fragment>
			{form.threadLoaded && <CommentForm 
				category={category.category}
				thread={thread.thread}
				header="New Comment" 
				onChange={onChange} 
				onSubmit={onSubmit} 
				form={{...form}}
				history={props.history} />
			}
		</React.Fragment>
	);
}

export default withRouter(NewComment);

// import React from 'react';
// import { connect } from 'react-redux';
// import { withRouter } from 'react-router-dom';

// import Spinner from './Spinner';
// import { getThread, newComment } from '../actions/threadActions';
// import CommentForm from './CommentForm';

// class NewComment extends React.Component {
// 	constructor(props) {
// 		super(props);
// 		this.state = {
// 			comment: '',
// 			commentFail: false,
// 			threadLoaded: false
// 		};
// 	}

// 	componentDidMount () {
// 		this.props.dispatch(getThread(this.props.token, this.props.id, true));
// 	}

// 	componentDidUpdate(prevProps) {
// 		if (this.props.thread !== prevProps.thread && this.props.thread !== null && this.state.threadLoaded === false) {
// 			let state = {};
// 			state.threadLoaded = true;
// 			this.setState(state);
// 		}
// 	}

// 	onChange = (event) => {
// 		let state = {};
// 		state[event.target.name] = event.target.value;
// 		state[`${event.target.name}Fail`] = false;
// 		this.setState(state);
// 	};

// 	onSubmit = (event) => {
// 		event.preventDefault();

// 		if (this.state.comment.length === 0)
// 		{
// 			let state = {};
// 			state.commentFail = true;
// 			this.setState(state);
// 			return;
// 		}
		
// 		const comment = {
// 			comment: this.state.comment,
// 			thread_id: this.props.thread.id
// 		}

// 		this.props.dispatch(newComment(this.props.token, comment, this.props.history));
// 	};

// 	onClickBreadcrum = (event) => {
// 		event.preventDefault();
// 		this.props.history.push(event.target.getAttribute("href"));
// 	}

// 	render() {
// 		const isLoading = this.props.loading && <Spinner />;
// 		return (
// 			<>
// 				{isLoading}
// 				{this.state.threadLoaded && <CommentForm 
// 					category={this.props.category}
// 					thread={this.props.thread}
// 					header="New Comment" 
// 					onChange={this.onChange} 
// 					onSubmit={this.onSubmit} 
// 					state={{...this.state}}
// 					history={this.props.history} />
// 				}
// 			</>
// 		);
// 	}
// }

// const mapStateToProps = (state) => {
// 	return {
// 		token: state.login.token,
// 		category: state.category.category,
// 		thread: state.thread.thread,
// 		loading: state.register.loading,
// 		error: state.thread.error
// 	};
// };

// const mapDispatchToProps = (dispatch) => ({
// 	dispatch
// });

// export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NewComment));
