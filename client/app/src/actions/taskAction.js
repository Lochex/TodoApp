import axios from 'axios';
import { LOAD_ALL_TASKS, UPDATE_TASK } from '../constants/actionTypes';
import setAuthorizationToken from '../utils/setAuthorizationToken';

const loadAllTasks = (tasks) => {
  return {
    type: LOAD_ALL_TASKS,
    tasks
  };
};

const getAllTasks = (todoId) => {
  return (dispatch) => {
    return axios.get(`/api/v1/todoitem/${todoId}/todotasks`)
    .then((response) => {
      if (response.status === 200) {
        const tasks = response.data;
        dispatch(loadAllTasks(tasks));
      }
    })
    .catch(function (error) {
      return error;
    });
  };
};

const addTask = (formDetails, todoId) => {
  return (dispatch) => {
    return axios.post(`/api/v1/todoitem/${todoId}/todotask`, formDetails)
    .then((response) => {
      if (response.status === 201){
        dispatch(getAllTasks(todoId));
      }
    })
    .catch(function (error) {
      return error;
    });
  };
};

const updateTask = (taskId, task, todoId) => {
  return (dispatch) => {
    return axios.put(`/api/v1/todotask/${taskId}`, task)
    .then((response) => {
      if (response.status === 200) {
        const task = response.data;
        dispatch(getAllTasks(todoId));
      }
    })
    .catch(function (error) {
      return error;
    });
  };
};

const deleteTask = (taskId, todoId) => {
  return (dispatch) => {
    return axios.delete(`/api/v1/todotask/${taskId}`)
    .then((response) => {
      if (response.status === 201) {
        dispatch(getAllTasks(todoId));
      }
    })
    .catch(function (error) {
      return error;
    });
  };
};

export { addTask, getAllTasks, updateTask, deleteTask };
