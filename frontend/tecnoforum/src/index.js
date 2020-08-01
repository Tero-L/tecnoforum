import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import { StateProvider } from './utils/StateProvider';
import { initialState, MainReducer } from './reducers/reducers';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
      <BrowserRouter>
		<StateProvider initialState={initialState} reducer={MainReducer}>
			<App />
		</StateProvider>
      </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// if ('serviceWorker' in navigator) {
//   navigator.serviceWorker
//     .register('/serviceWorker.js')
//     .then(function () {
//       console.log('Service worker registered!');
//     })
//     .catch(function (err) {
//       console.log(err);
//     });
// }
