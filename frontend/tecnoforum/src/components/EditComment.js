import React, {useState, useEffect} from 'react';
import { withRouter } from 'react-router-dom';

import { editComment, getThread, getComment } from '../actions/threadActions';
import { useStateValue } from '../utils/StateProvider';
import CommentForm from './CommentForm';

const EditComment = (props) => {
	const [{login, category, thread}, dispatch] = useStateValue();
	const [form, setForm] = useState({
		comment: '',
		commentFail: false,
		threadLoaded: false,
		commentLoaded: false,
		loadingthread: false
	});

	useEffect(() => {
		let state = {...form};
		let stateUpdate = false;

		if (form.threadLoaded === false && thread.thread !== null)
		{
			state.threadLoaded = true;
			stateUpdate = true;
		}
		if (form.commentLoaded === false && thread.comment !== null)
		{
			state.commentLoaded = true;
			state.comment = thread.comment.comment;
			stateUpdate = true;
		}

		if ( stateUpdate )
			setForm(state);
	}, [thread, form.loadingthread]);

	useEffect(() => {
		getThread(dispatch, login.token, props.id, true);
		getComment(dispatch, login.token, props.comment_id);
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
			id: props.comment_id,
			thread_id: thread.thread.id
		}

		editComment(dispatch, login.token, comment, props.history)
	};

	console.log("did this rerender?");
	return (
		<React.Fragment>
			{form.threadLoaded && form.commentLoaded && <CommentForm 
				category={category.category}
				thread={thread.thread}
				header="Edit Comment" 
				onChange={onChange} 
				onSubmit={onSubmit} 
				form={{...form}} 
				history={props.history} />
			}
		</React.Fragment>
	);
}

export default withRouter(EditComment);