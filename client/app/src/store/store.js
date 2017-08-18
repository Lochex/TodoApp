import { combineReducers, applyMiddleware, createStore, compose } from 'redux';
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
});

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));
// const store = createStore(rootReducer, compose(
//   applyMiddleware(thunk),
//   window.devToolsExtension ? window.devToolsExtension(): f => f ));

export default store;