import { combineReducers, applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import userReducer from '../reducers/userReducer';
import todosReducer from '../reducers/todosReducer';
import todoReducer from '../reducers/todoReducer';
import taskReducer from '../reducers/taskReducer';

const rootReducer = combineReducers({
  userReducer,
  todosReducer,
  taskReducer,
  todoReducer,
});

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;
