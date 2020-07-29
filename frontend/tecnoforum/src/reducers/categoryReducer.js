import { FETCH_CATEGORIES_SUCCESS,
	FETCH_CATEGORIES_FAILED,
	FETCH_CATEGORY_SUCCESS,
	FETCH_CATEGORY_FAILED,
	FETCH_THREADS_SUCCESS,
	FETCH_THREADS_FAILED,
	ADD_CATEGORY_SUCCESS,
	ADD_CATEGORY_FAILED,
	REMOVE_CATEGORY_SUCCESS,
	REMOVE_CATEGORY_FAILED,
	EDIT_CATEGORY_SUCCESS,
	EDIT_CATEGORY_FAILED,
	CLEAR_THREADS } from '../actions/categoryActions';

const sessionString = 'categorystate';
const loadInitialState = () => {
	if ( sessionStorage.getItem (sessionString) ) 
	{
		let categorystate = JSON.parse(sessionStorage.getItem(sessionString));
		categorystate.error = "";
		return categorystate;
	}
	else
	{
		return {
			threads: null,
			category: null,
			categories: [],
			error: '',
		};
	}
}

export const categoryInit = loadInitialState ();

export const CategoryReducer = (category, action) => {
	console.log('CategoryReducer, action:', action);
	let state = {};
	switch (action.type) {
		case FETCH_CATEGORIES_SUCCESS:
			state = {
				...category,
				categories: action.categories,
				error: '',
			};
			break;
		case FETCH_CATEGORIES_FAILED:
			state = {
				...category,
				error: action.error,
			};
			break;
		case FETCH_CATEGORY_SUCCESS:
			state = {
				...category,
				category: action.category,
				error: '',
			};
			break;
		case FETCH_CATEGORY_FAILED:
			state = {
				...category,
				error: action.error,
			};
			break;
		case FETCH_THREADS_SUCCESS:
			state = {
				...category,
				threads: action.threads,
				error: '',
			}
			break;
		case FETCH_THREADS_FAILED:
			state = {
				...category,
				error: action.error,
			};
			break;
		case ADD_CATEGORY_SUCCESS:
			state = {
				...category,
				error: '',
			};
			break;
		case ADD_CATEGORY_FAILED:
			state = {
				...category,
				error: action.error,
			};
			break;
		case REMOVE_CATEGORY_SUCCESS:
			state = {
				...category,
				error: '',
			};
			break;
		case REMOVE_CATEGORY_FAILED:
			state = {
				...category,
				error: action.error,
			};
			break;
		case EDIT_CATEGORY_SUCCESS:
			state = {
				...category,
				error: '',
			};
			break;
		case EDIT_CATEGORY_FAILED:
			state = {
				...category,
				error: action.error,
			};
			break;
		case CLEAR_THREADS:
			state = {
				...category,
				threads: null,
				error: ''
			}
			break;
		default:
			return category;
	}
	sessionStorage.setItem(sessionString, JSON.stringify(state));
	return state;
}