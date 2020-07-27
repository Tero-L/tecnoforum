import { LOGIN_SUCCESS,
	LOGIN_FAILED,
	LOGOUT_SUCCESS,
	LOGOUT_FAILED } from '../actions/loginActions';

export const loginInit = {
	token: '',
	user: {},
	isLogged: false,
	error: '',
};

export const LoginReducer = (login, action) => {
	console.log('LoginReducer, action:', action);
	switch (action.type)
	{
		case LOGIN_SUCCESS:
			return {
				isLogged: true,
				token: action.data.token,
				user: action.data.user,
				error: '',
				loading: false,
			};
		case LOGIN_FAILED:
			return {
				...login,
				error: action.error
			};
		case LOGOUT_SUCCESS:
			return {
				isLogged: false,
				token: '',
				user: {},
				error: ''
			};
		case LOGOUT_FAILED:
			return {
				isLogged: false,
				token: '',
				user: {},
				error: action.error
			};
		default:
			return login;
	}
}

// const endLoading = (login) =>
// {
// 	return {
// 		...LoginReducer(login, {type: LOADING})
// 	}
// }