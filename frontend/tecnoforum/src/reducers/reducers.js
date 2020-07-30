import { LoginReducer, loginInit } from './loginReducer';
import { RegisterReducer, registerInit } from './registerReducer';
import { CategoryReducer, categoryInit } from './categoryReducer';
import { ThreadReducer, threadInit } from './threadReducer';

const loadInitialState = () => {
	return {
		login: loginInit,
		register: registerInit,
		category: categoryInit,
		thread: threadInit
	};
}

export const initialState = loadInitialState ();
  
export const MainReducer = ({login, register, category, thread}, action) => {
	return {
		login: LoginReducer ( login, action ),
		register: RegisterReducer ( register, action ),
		category: CategoryReducer ( category, action),
		thread: ThreadReducer ( thread, action)
	};
};