import axios from 'axios';
import toastr from 'toastr';
import { SAVE_USER } from '../constants/actionTypes';
import setAuthorizationToken from '../utils/setAuthorizationToken';

const loginRequestSuccess = (user) => {
  return {
    type: SAVE_USER,
    user
  };
};
const loginRequest = (formDetails) => {
  return dispatch => {
    return axios.post('/api/v1/user/login', formDetails)
    .then((response) => {
      const { user, message } = response.data;

      if (response.status === 200) {
        const token = response.data.jwt;
        localStorage.setItem('jwtToken', token);
        setAuthorizationToken(token);
        dispatch(loginRequestSuccess(user));
        toastr.success(message);
      }
    })
    .catch(function (error) {
      return error;
    });
  };
};

export { loginRequest, loginRequestSuccess };
