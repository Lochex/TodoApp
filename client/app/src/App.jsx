import React from 'react';
import ReactDOM from 'react-dom'; 
import { Router, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import routes from './routes.js';
import jwtDecode from 'jwt-decode';
import store from './store/store';
import setAuthorizationToken from './utils/setAuthorizationToken';
import { loginRequestSuccess } from './actions/loginAction';
import './sass/app.scss';
// const store = createStore(
//   (state = {}) => state,
//   applyMiddleware(thunk)
// );

if (localStorage.jwtToken) {
  setAuthorizationToken(localStorage.jwtToken);
  store.dispatch(loginRequestSuccess(jwtDecode(localStorage.jwtToken)));
}

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory} routes={routes} />
  </Provider>, document.getElementById('root'),
);
