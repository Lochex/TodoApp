import { GET_TODO } from '../constants/actionTypes';

const initialState = {
  todo: {},
};

const todoReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case GET_TODO :
      const { todo } = action;
      return Object.assign({}, state.todo, todo);
    default:
      return state;
  }
};

export default todoReducer;
