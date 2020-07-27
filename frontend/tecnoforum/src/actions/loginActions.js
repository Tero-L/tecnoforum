// import { clearContactReducerState, getContacts } from './contactActions';

//Action constants

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS',
	LOGIN_FAILED = 'LOGIN_FAILED',
	LOGOUT_SUCCESS = 'LOGOUT_SUCCESS',
	LOGOUT_FAILED = 'LOGOUT_FAILED';

//Async Actions

export const onLogin = (dispatch, user, history) => {
    let request = {
      method: 'POST',
      mode: 'cors',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(user),
    };
    // dispatch(loading());
    fetch('/api/users/login', request).then((response) => {
        if (response.ok) {
          response.json().then((data) => {
			  console.log(data);
              dispatch(loginSuccess(data));
			  history.push('/');
            }).catch((error) => {
              dispatch(loginFailed(`Server responded with status: ${error}`));
            });
        } else {
			response.json().then((data) => {
			  dispatch(loginFailed(`Server responded with status: ${data.error}`));
            }).catch((error) => {
			  dispatch(loginFailed(`Server responded with status: ${response.status}`));
            });
        }
      }).catch((error) => {
        dispatch(loginFailed(`Server responded with status: ${error}`));
      });
};

export const onLogout = (dispatch, token) => {
	let request = {
		method: 'POST',
		mode: 'cors',
		headers: { 'Content-type': 'application/json', Authorization: `bearer ${token}` },
		};
		// dispatch(loading());
		fetch('/logout', request).then((response) => {
			dispatch(logoutSuccess());
		}).catch((error) => {
			dispatch(logoutFailed(`Server responded with an error: ${error}`));
	});
};
// Action Creators

// export const loading = () => {
//   return {
//     type: LOADING,
//   };
// };

// export const endLoading = () => {
//   return {
//     type: END_LOADING,
//   };
// };

export const loginSuccess = (data) => {
  return {
    type: LOGIN_SUCCESS,
    data: data,
  };
};

export const loginFailed = (error) => {
  return {
    type: LOGIN_FAILED,
    error: error,
  };
};

export const logoutSuccess = () => {
  return {
    type: LOGOUT_SUCCESS,
  };
};

export const logoutFailed = (error) => {
  return {
    type: LOGOUT_FAILED,
  };
};
