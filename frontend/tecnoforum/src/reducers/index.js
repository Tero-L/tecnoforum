import { LoginReducer, loginInit } from '../reducers/loginReducer';

const loadInitialState = () => {
	if ( sessionStorage.getItem ('mainstate') ) 
	{
		let mainstate = JSON.parse(sessionStorage.getItem('mainstate'));
		mainstate.login.error = "";
		return mainstate;
	}
	else
	{
		return {
			login: loginInit
		};
	}
}

export const initialState = loadInitialState ();
  
export const MainReducer = ({login}, action) => {
	let newState = ({
		login: LoginReducer (login, action )
	});
	sessionStorage.setItem('mainstate', JSON.stringify(newState));
	return newState;
};