import axios from 'axios';
import { LOAD_ALL_TODOS, GET_TODO } from '../constants/actionTypes';

const loadAllTodos = todos => ({
  type: LOAD_ALL_TODOS,
  todos
});

const receiveTodo = todo => ({
  type: GET_TODO,
  todo
});

const getAllTodos = () => {
  return (dispatch) => {
    return axios.get('/api/v1/todoitems')
    .then((response) => {
      if (response.status === 200) {
        const todos = response.data;
        dispatch(loadAllTodos(todos));
      }
    })
    .catch(function (error) {
      return error;
    });
  };
};

const addTodo = (formDetails) => {
  return (dispatch) => {
    return axios.post('/api/v1/todoitem', formDetails)
    .then((response) => {
      if (response.status === 201) {
        dispatch(getTodo(response.data._id));
        dispatch(getAllTodos());
      }
    })
    .catch(function (error) {
      return error;
    });
  };
};

const getTodo = (todoId) => {
  return (dispatch) => {
    return axios.get(`/api/v1/todoitem/${todoId}`)
    .then((response) => {
      if (response.status === 200) {
        const todo = response.data;
        dispatch(receiveTodo(todo));
      }
    })
    .catch(function (error) {
      return error;
    });
  };
};

export { addTodo, getAllTodos, getTodo };
