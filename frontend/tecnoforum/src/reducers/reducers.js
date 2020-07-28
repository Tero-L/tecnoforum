import { LoginReducer, loginInit } from './loginReducer';
import { RegisterReducer, registerInit } from './registerReducer';

const loadInitialState = () => {
	return {
		login: loginInit,
		register: registerInit
	};
}

export const initialState = loadInitialState ();
  
export const MainReducer = ({login, register}, action) => {
	return {
		login: LoginReducer ( login, action ),
		register: RegisterReducer ( register, action )
	};
};