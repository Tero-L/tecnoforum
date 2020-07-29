import { LoginReducer, loginInit } from './loginReducer';
import { RegisterReducer, registerInit } from './registerReducer';
import { CategoryReducer, categoryInit } from './categoryReducer';

const loadInitialState = () => {
	return {
		login: loginInit,
		register: registerInit,
		category: categoryInit
	};
}

export const initialState = loadInitialState ();
  
export const MainReducer = ({login, register, category}, action) => {
	return {
		login: LoginReducer ( login, action ),
		register: RegisterReducer ( register, action ),
		category: CategoryReducer ( category, action)
	};
};