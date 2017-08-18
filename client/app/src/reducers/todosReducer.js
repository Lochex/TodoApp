import { LOAD_ALL_TODOS } from '../constants/actionTypes';

const initialState = {
  todos: [],
}

const todosReducer = (state=initialState, action = {}) => {
  switch (action.type) {
    case LOAD_ALL_TODOS :
    const { todos } = action;
      return { ...state,
        todos
      }
    default:
    return state
  }
}
export default todosReducer;