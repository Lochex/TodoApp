import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import axios from 'axios';
import * as types from '../src/constants/actionTypes';
import { addTodo, getAllTodos, getTodo } from '../src/actions/todoAction';

const response = {
  data: [
  { title: 'Building project' },
    { title: 'Party Planning'
    }] };

const mockFnOne = jest.spyOn(axios, 'get').mockImplementation(() => Promise.resolve({ data: response, status: 200 }));
const mockFnTwo = jest.spyOn(axios, 'post').mockImplementation(() => Promise.resolve({ data: response, status: 201 }));

describe('Todo Action', () => {
  const middleware = [thunk];
  const mockStore = configureMockStore(middleware);
  describe('Get all Todos', () => {
    it('Should make an AJAX call to get all Todos', (done) => {
      const initialState = {
        todo: []
      };
      const store = mockStore(initialState);
      const expectedAction = [{ type: types.LOAD_ALL_TODOS, todos: { data: response.data } }];
      store.dispatch(getAllTodos()).then(() => {
        const actions = store.getActions();
        expect(actions).toEqual(expectedAction);
        done();
      });
    });
  });

  describe('Get Todo', () => {
    it('Should make an AJAX call to get a Todo item', (done) => {
      const todoId = '59a02976fc';
      const initialState = {
        todo: {}
      };
      const store = mockStore(initialState);
      const expectedAction = [{ type: types.GET_TODO, todo: { data: response.data } }];
      return store.dispatch(getTodo(todoId)).then(() => {
        const actions = store.getActions();
        expect(actions).toEqual(expectedAction);
        done();
      });
    });
  });

  describe('Add Todo', () => {
    it('Should make an AJAX call to get create Todo item', (done) => {
      const todo = { title: 'Building Software' };
      const initialState = {
        todo: []
      };
      const store = mockStore(initialState);
      const expectedAction = [{ type: types.LOAD_ALL_TODOS, todos: { data: response.data } }];
      store.dispatch(addTodo(todo)).then(() => {
        const actions = store.getActions();
        expect(mockFnOne).toHaveBeenCalled();
        expect(mockFnTwo).toHaveBeenCalled();
        expect(actions).toEqual(expectedAction);
        done();
      }).catch((e) => {
        console.log(e, 'this is an error');
      });
    });
  });
});
