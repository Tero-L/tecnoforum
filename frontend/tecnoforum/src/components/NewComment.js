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