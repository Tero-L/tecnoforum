import { REGISTER_SUCCESS,
	REGISTER_FAILED } from '../actions/registerActions';

const sessionString = 'registerstate';
const loadInitialState = () => {
	if ( sessionStorage.getItem (sessionString) ) 
	{
		let registerstate = JSON.parse(sessionStorage.getItem(sessionString));
		registerstate.error = "";
		registerstate.success = false;
		return registerstate;
	}
	else
	{
		return {
			error: '',
			success: false
		};
	}
}

export const registerInit = loadInitialState ();

export const RegisterReducer = (register, action) => {
	console.log('RegisterReducer, action:', action);
	let state = {};
	switch (action.type)
	{
		case REGISTER_SUCCESS:
			state = {
				...register,
				error: '',
				success: true
			};
			break;
		case REGISTER_FAILED:
			state = {
				...register,
				error: action.error,
				success: false
			};
			break;
		default:
			return register;
	}
	sessionStorage.setItem(sessionString, JSON.stringify(state));
	return state;
}