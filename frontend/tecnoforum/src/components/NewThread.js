import React, {useState, useEffect} from 'react';
import { withRouter } from 'react-router-dom';

import { getCategory } from '../actions/categoryActions';
import { newThread } from '../actions/threadActions';
import { useStateValue } from '../utils/StateProvider';
import ThreadForm from './ThreadForm';

const NewThread = (props) => {
	const [{login, category}, dispatch] = useStateValue();
	const [form, setForm] = useState({
		title: '',
		comment: '',
		titleFail: false,
		commentFail: false
	});

	useEffect(() => {
		if (category.category.id !== props.id)
			getCategory(dispatch, login.token, props.id, false);
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
		
		const thread = {
			threadName: form.title,
			description: form.comment,
			categoryName: category.category.categoryName
		}

		newThread(dispatch, login.token, thread, props.history);
	};

	const categoryName = category.category ? category.category.categoryName : "Category";
	console.log("did this rerender?");
	return (
		<React.Fragment>
			<ThreadForm 
				id={props.id} 
				categoryName={categoryName} 
				header="New Thread" 
				onChange={onChange} 
				onSubmit={onSubmit} 
				form={{...form}} 
				history={props.history} 
			/>
		</React.Fragment>
	);
}

export default withRouter(NewThread);