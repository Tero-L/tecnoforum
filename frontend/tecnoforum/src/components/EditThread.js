import React, {useState, useEffect} from 'react';
import { withRouter } from 'react-router-dom';

import { editThread, getThread } from '../actions/threadActions';
import { useStateValue } from '../utils/StateProvider';
import ThreadForm from './ThreadForm';

const EditThread = (props) => {
	const [{login, category, thread}, dispatch] = useStateValue();
	const [form, setForm] = useState({
		title: '',
		comment: '',
		titleFail: false,
		commentFail: false,
		threadLoaded: false,
		loadingthread: false
	});

	useEffect(() => {
		if (thread.thread !== null && form.threadLoaded === false) {
			let state = {...form};
			state.threadLoaded = true;
			state.title = thread.thread.threadName;
			state.comment = thread.thread.description;
			setForm(state);
		}
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
		let state = {...form};
		let errors = false;

		if (form.title.length === 0 || form.title.length < 4 )
		{
			state.titleFail = true;
			errors = true;
		}
		if (form.comment.length === 0)
		{
			state.commentFail = true;
			errors = true;
		}
		
		if (errors)
		{
			setForm(state);
			return;
		}
		
		const t = {
			threadName: form.title,
			description: form.comment,
			id: thread.thread.id
		}

		editThread(dispatch, login.token, t, props.history);
	};

	const categoryName = category.category ? category.category.categoryName : "Category";
	console.log("did this rerender?");
	return (
		<React.Fragment>
			{form.threadLoaded && <ThreadForm 
				id={category.category.id} 
				thread_id={thread.thread.id}
				categoryName={categoryName}
				header="Edit Thread" 
				onChange={onChange} 
				onSubmit={onSubmit} 
				form={{...form}} 
				editThread={true}
				history={props.history} />
			}
		</React.Fragment>
	);
}

export default withRouter(EditThread);