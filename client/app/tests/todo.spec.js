import { expect } from 'chai';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import * as types from '../src/constants/actionTypes';
import { addTodo, getAllTodos, getTodo } from '../src/actions/todoAction';

describe('Todo Action', () => {
  const middleware = [thunk];
  const mockStore = configureMockStore(middleware);
  describe('Create document', () => {
    it('Should make an AJAX call to create Todos', (done) => {
      const todo = {
        title: 'Bui;ding project',
      };
      const store = mockStore({});
      const expectedAction = [{ type: types.LOAD_ALL_TODOS }];
      store.dispatch(addTodo(todo)).then(() => {
        expect(store.getActions()).to.deep.equal(expectedAction);
      });
      done();
    });
  });
});
