import React from 'react';
import ReactDOM from 'react-dom'; 
import { Route } from 'react-router';
import { Provider } from 'react-redux';
import jwtDecode from 'jwt-decode';
import Signup from './components/Signup';
import Login from './components/Login';
import Main from './components/Main';
import TodoTasks from './components/TodoTasks';
import Welcome from './components/Welcome';
import store from './store/store.js';
import setAuthorizationToken from './utils/setAuthorizationToken.js'
import { loginRequestSuccess } from './actions/loginAction.js';

export default
  <div>
    <Route exact path="/" component={Signup} />
    <Route path="/login" component={Login} />
    <Route component={Main} >
      <Route path="/dashboard" component={Welcome} />
      <Route path="/todos/:id" component={TodoTasks} />
    </Route>
  </div>;