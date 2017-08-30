import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import axios from 'axios';
import * as types from '../src/constants/actionTypes';
import { loginRequest } from '../src/actions/loginAction';
import { userSignupRequest } from '../src/actions/signupAction';

const storageMock = () => ({
  setItem: jest.fn(),
  getItem: jest.fn(),
});

window.localStorage = storageMock();

const response = {
  data: {
    user: {
      _id: '59801def56c905024cee000e',
      name: 'Pario Blaze',
      email: 'pario@gmail.com'
    },
    jwt: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1OTgwMWRlZjU2YzkwNTAyNGNlZTAwMGUiLCJuYW1lIjoiUGFyaW8gQmxhemUiLCJlbWFpbCI6InBhcmlvQGdtYWlsLmNvbSIsImlhdCI6MTUwNDA5NDcwOH0.7tU8DxQZUqyFn-__17rtx2OtO5ryJrSGwaKrYq8TMlg',
    message: 'Login successful'
  }
};

describe('Login Action', () => {
  const middleware = [thunk];
  const mockStore = configureMockStore(middleware);
  describe('Login user', () => {
    it('Should make an AJAX call to login a user', (done) => {
      const mockFnLogin = jest.spyOn(axios, 'post').mockImplementation(() => Promise.resolve({ data: response.data, status: 200 }));
      const user = { email: 'pario@gmail.com', password: 'pari789#' };
      const initialState = {
        user: {},
        isAuth: false
      };
      const store = mockStore(initialState);
      const expectedAction = [{ type: types.SAVE_USER, user: response.data.user }];
      store.dispatch(loginRequest(user)).then(() => {
        const actions = store.getActions();
        expect(actions).toEqual(expectedAction);
        done();
      });
    });
  });

  describe('Signup user', () => {
    it('Should make an AJAX call to signup a user', (done) => {
      const mockFnSignup = jest.spyOn(axios, 'post').mockImplementation(() => Promise.resolve({ data: response.data, status: 201 }));
      const user = { name: 'Pario Blaze', email: 'pario@gmail.com', password: 'pario789#' };
      const initialState = {
        user: {},
        isAuth: false
      };
      const store = mockStore(initialState);
      const expectedAction = [{ type: types.SAVE_USER, user: response.data.user }];
      store.dispatch(userSignupRequest(user)).then(() => {
        const actions = store.getActions();
        expect(actions).toEqual(expectedAction);
        done();
      });
    });
  });
});

