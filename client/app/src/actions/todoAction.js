import axios from 'axios';
import { LOAD_ALL_TODOS, GET_TODO } from '../constants/actionTypes';
import setAuthorizationToken from '../utils/setAuthorizationToken';

const loadAllTodos = (todos) => {
  return {
    type: LOAD_ALL_TODOS,
    todos
  }
}

const addTodo = (formDetails) => {
  return dispatch => {
    return axios.post('/api/v1/todoitem', formDetails)
    .then((response) => {
      if (response.status === 201){
        const todo = response.data;
         dispatch(getAllTodos());
      }
    })
    .catch(function (error) {
      return error;
    });
  }
}

const getTodo = (todoId) => {
  return dispatch => {
    return axios.get(`/api/v1/todoitem/${todoId}`)
    .then((response) => {
      console.log(response, 'gettodo res');
      if (response.status === 200){
        const todo = response.data;
         dispatch(receiveTodo(todo));
      }
    })
    .catch(function (error) {
      console.log('See error', error);
      return error;
    });
  }

}

const getAllTodos = () => {
  return dispatch => {
    return axios.get('/api/v1/todoitems')
    .then((response) => {
      if (response.status === 200){
        const todos = response.data;
        console.log(todos, 'A todos');
         dispatch(loadAllTodos(todos));
      }
    })
    .catch(function (error) {
      return error;
    });
  }

}
export { addTodo, getAllTodos, getTodo };