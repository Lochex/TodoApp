import axios from 'axios';
import { LOAD_ALL_TASKS, UPDATE_TASK } from '../constants/actionTypes';
import setAuthorizationToken from '../utils/setAuthorizationToken';

const loadAllTasks = (tasks) => {
  return {
    type: LOAD_ALL_TASKS,
    tasks
  }
}

const changeTask = (taskId, task) => {
  return {
    type: UPDATE_TASK,
    taskId,
    task
  }
}

const addTask = (formDetails, todoId) => {
  console.log(formDetails, todoId, 'Todo stuff');
  return dispatch => {
    return axios.post(`/api/v1/todoitem/${todoId}/todotask`, formDetails)
    .then((response) => {
      console.log(response, 'tis response');
      if (response.status === 201){
         dispatch(getAllTasks(todoId));
      }
    })
    .catch(function (error) {
      return error;
    });
  }
}

const updateTask = (taskId, task) => {
  return dispatch => {
    return axios.put(`/api/v1/todotask/${taskId}`, task)
    .then((response) => {
      console.log(response, '___________ 3');
      console.log(response.status, '___________ 4');
      if (response.status === 200){
        console.log(response, '_________My Response');
        const tasks = response.data;
         dispatch(changeTask(taskId, tasks));
      }
    })
    .catch(function (error) {
      console.log('See error', error);
      return error;
    });
  }
}

const getAllTasks = (todoId) => {
  return dispatch => {
    return axios.get(`/api/v1/todoitem/${todoId}/todotasks`)
    .then((response) => {
      console.log(response);
      if (response.status === 200){
        const tasks = response.data;
         dispatch(loadAllTasks(tasks));
      }
    })
    .catch(function (error) {
      console.log('See error', error);
      return error;
    });
  }

}

const getTodo = (todoId) => {
  return dispatch => {
    return axios.get(`/api/v1/todoitem/${todoId}`)
    .then((response) => {
      console.log(response);
      if (response.status === 200){
        const tasks = response.data;
         dispatch(receiveTodo(todo));
      }
    })
    .catch(function (error) {
      console.log('See error', error);
      return error;
    });
  }

}

export { addTask, getAllTasks, updateTask };