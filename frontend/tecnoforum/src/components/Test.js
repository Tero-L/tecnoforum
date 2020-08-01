import React, { useEffect, useState, useContext } from 'react';

import { useStateValue } from '../utils/StateProvider';
import { LOADING,
	END_LOADING,
	LOGIN_SUCCESS,
	LOGIN_FAILED,
	LOGOUT_SUCCESS,
	LOGOUT_FAILED } from '../reducers/loginReducer';

export const Test = () => {
	const [test, setTest] = useState({
		testing:""
	});

	const [{login}, dispatch] = useStateValue();
	useEffect(() => {
		dispatch({type: LOADING});
	}, []);

	const onChange = (event) => {
		setTest({
			...test,
			[event.target.name]:event.target.value
		})
	};

	const onSubmit = (event) => {
		event.preventDefault();
		dispatch({type: END_LOADING, test: test.testing});
	};
	const onSubmit2 = (event) => {
		event.preventDefault();
		dispatch({type: LOGOUT_SUCCESS});
	};

	console.log("did this rerender?");
	return (
		<div>
			{login.SOMETHING}<br/>
			<input name="testing" onChange={onChange} /><br/>
			<button onClick={onSubmit}>Test</button>
			<button onClick={onSubmit2}>Test</button>
		</div>
	);
}