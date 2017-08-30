import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import axios from 'axios';
import * as types from '../src/constants/actionTypes';
import { addTask, getAllTasks, updateTask, deleteTask } from '../src/actions/taskAction';

const response = {
  data: [
    { content: 'Building project' },
    { content: 'Party Planning' }
  ]
};

const mockFnOne = jest.spyOn(axios, 'get').mockImplementation(() => Promise.resolve({ data: response, status: 200 }));
const mockFnTwo = jest.spyOn(axios, 'post').mockImplementation(() => Promise.resolve({ data: response, status: 201 }));
const mockFnThree = jest.spyOn(axios, 'delete').mockImplementation(() => Promise.resolve({ data: response, status: 201 }));
const mockFnFour = jest.spyOn(axios, 'put').mockImplementation(() => Promise.resolve({ data: response, status: 200 }));

describe('Task Action', () => {
  const middleware = [thunk];
  const mockStore = configureMockStore(middleware);
  describe('Get all Tasks', () => {
    it('Should make an AJAX call to get all Tasks', (done) => {
      const todoId = '5457758728752';
      const initialState = {
        tasks: []
      };
      const store = mockStore(initialState);
      const expectedAction = [{ type: types.LOAD_ALL_TASKS, tasks: { data: response.data } }];
      store.dispatch(getAllTasks(todoId)).then(() => {
        const actions = store.getActions();
        expect(actions).toEqual(expectedAction);
        done();
      });
    });
  });

  describe('Add Task', () => {
    it('Should make an AJAX call to create Task', (done) => {
      const todoId = '5457758728752';
      const task = { title: 'Get Client Requirements' };
      const initialState = {
        tasks: []
      };
      const store = mockStore(initialState);
      const expectedAction = [{ type: types.LOAD_ALL_TASKS, tasks: { data: response.data } }];
      store.dispatch(addTask(task, todoId)).then(() => {
        const actions = store.getActions();
        expect(mockFnTwo).toHaveBeenCalled();
        expect(actions).toEqual(expectedAction);
        done();
      }).catch((e) => {
        console.log(e, 'this is an error');
      });
    });
  });

  describe('Update Task', () => {
    it('Should make an AJAX call to update Task', (done) => {
      const todoId = '5457758728752';
      const task = { title: 'Get Client Requirement' };
      const initialState = {
        tasks: []
      };
      const store = mockStore(initialState);
      const expectedAction = [{ type: types.LOAD_ALL_TASKS, tasks: { data: response.data } }];
      store.dispatch(updateTask(task, todoId)).then(() => {
        const actions = store.getActions();
        expect(mockFnFour).toHaveBeenCalled();
        expect(mockFnOne).toHaveBeenCalled();
        expect(actions).toEqual(expectedAction);
        done();
      }).catch((e) => {
        console.log(e, 'this is an error');
      });
    });
  });

  describe('Delete Task', () => {
    it('Should make an AJAX call to delete Task', (done) => {
      const taskId = '58285725';
      const todoId = '5457758728752';
      const initialState = {
        tasks: []
      };
      const store = mockStore(initialState);
      store.dispatch(deleteTask(taskId, todoId)).then(() => {
        expect(mockFnOne).toHaveBeenCalled();
        expect(mockFnThree).toHaveBeenCalled();
        done();
      }).catch((e) => {
        console.log(e, 'this is an error');
      });
    });
  });
});

