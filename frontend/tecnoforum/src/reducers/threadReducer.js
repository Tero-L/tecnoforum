import { FETCH_THREAD_SUCCESS,
	FETCH_THREAD_FAILED,
	FETCH_COMMENT_SUCCESS,
	FETCH_COMMENT_FAILED,
	FETCH_COMMENTS_SUCCESS,
	FETCH_COMMENTS_FAILED,
	ADD_THREAD_SUCCESS,
	ADD_THREAD_FAILED,
	REMOVE_THREAD_SUCCESS,
	REMOVE_THREAD_FAILED,
	EDIT_THREAD_SUCCESS,
	EDIT_THREAD_FAILED,
	ADD_COMMENT_SUCCESS,
	ADD_COMMENT_FAILED,
	REMOVE_COMMENT_SUCCESS,
	REMOVE_COMMENT_FAILED,
	EDIT_COMMENT_SUCCESS,
	EDIT_COMMENT_FAILED,
	CLEAR_THREAD_AND_COMMENTS } from '../actions/threadActions';

const sessionString = 'threadstate';
const loadInitialState = () => {
	if ( sessionStorage.getItem (sessionString) ) 
	{
		let threadstate = JSON.parse(sessionStorage.getItem(sessionString));
		threadstate.error = "";
		return threadstate;
	}
	else
	{
		return {
			thread: null,
			comments: null,
			comment: null,
			error: '',
		};
	}
}

export const threadInit = loadInitialState ();

export const ThreadReducer = (thread, action) => {
	console.log('ThreadReducer, action:', action);
	let state = {};
	switch (action.type) {
		case FETCH_THREAD_SUCCESS:
			state = {
				...thread,
				thread: action.thread,
				error: '',
			};
			break;
		case FETCH_THREAD_FAILED:
			state = {
				...thread,
				error: action.error,
			};
			break;
		case FETCH_COMMENT_SUCCESS:
			state = {
				...thread,
				comment: action.comment,
				error: '',
			};
			break;
		case FETCH_COMMENT_FAILED:
			state = {
				...thread,
				error: action.error,
			};
			break;
		case FETCH_COMMENTS_SUCCESS:
			state = {
				...thread,
				comments: action.comments,
				error: '',
			};
			break;
		case FETCH_COMMENTS_FAILED:
			state = {
				...thread,
				error: action.error,
			};
			break;
		case ADD_THREAD_SUCCESS:
			state = {
				...thread,
				error: '',
			};
			break;
		case ADD_THREAD_FAILED:
			state = {
				...thread,
				error: action.error,
			};
			break;
		case REMOVE_THREAD_SUCCESS:
			state = {
				...thread,
				error: '',
			};
			break;
		case REMOVE_THREAD_FAILED:
			state = {
				...thread,
				error: action.error,
			};
			break;
		case EDIT_THREAD_SUCCESS:
			state = {
				...thread,
				error: '',
			};
			break;
		case EDIT_THREAD_FAILED:
			state = {
				...thread,
				error: action.error,
			};
			break;
		case ADD_COMMENT_SUCCESS:
			state = {
				...thread,
				error: '',
			};
			break;
		case ADD_COMMENT_FAILED:
			state = {
				...thread,
				error: action.error,
			};
			break;
		case REMOVE_COMMENT_SUCCESS:
			state = {
				...thread,
				error: '',
			};
			break;
		case REMOVE_COMMENT_FAILED:
			state = {
				...thread,
				error: action.error,
			};
			break;
		case EDIT_COMMENT_SUCCESS:
			state = {
				...thread,
				error: '',
			};
			break;
		case EDIT_COMMENT_FAILED:
			state = {
				...thread,
				error: action.error,
			};
			break;
		case CLEAR_THREAD_AND_COMMENTS:
			state = {
				...thread,
				comments: null,
				comment: null,
				thread: null,
				error: ''
			}
			break;
		default:
			return thread;
	}
	sessionStorage.setItem(sessionString, JSON.stringify(state));
	return state;
}