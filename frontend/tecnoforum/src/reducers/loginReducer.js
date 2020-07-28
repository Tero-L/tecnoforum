import { LOGIN_SUCCESS,
	LOGIN_FAILED,
	LOGOUT_SUCCESS,
	LOGOUT_FAILED } from '../actions/loginActions';

const sessionString = 'loginstate';
const loadInitialState = () => {
	if ( sessionStorage.getItem (sessionString) ) 
	{
		let loginstate = JSON.parse(sessionStorage.getItem(sessionString));
		loginstate.error = "";
		return loginstate;
	}
	else
	{
		return {
			token: '',
			user: {},
			isLogged: false,
			error: '',
		};
	}
}

export const loginInit = loadInitialState ();

export const LoginReducer = (login, action) => {
	console.log('LoginReducer, action:', action);
	let state = {};
	switch (action.type)
	{
		case LOGIN_SUCCESS:
			state = {
				isLogged: true,
				token: action.data.token,
				user: action.data.user,
				error: '',
				loading: false,
			};
			break;
		case LOGIN_FAILED:
			state = {
				...login,
				error: action.error
			};
			break;
		case LOGOUT_SUCCESS:
			state = {
				isLogged: false,
				token: '',
				user: {},
				error: ''
			};
			break;
		case LOGOUT_FAILED:
			state = {
				isLogged: false,
				token: '',
				user: {},
				error: action.error
			};
			break;
		default:
			return login;
	}
	sessionStorage.setItem(sessionString, JSON.stringify(state));
	return state;
}