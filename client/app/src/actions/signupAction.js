import axios from 'axios';
import toastr from 'toastr';
import { SAVE_USER } from '../constants/actionTypes';
import setAuthorizationToken from '../utils/setAuthorizationToken';

const userSignupRequestSuccess = (user) => {
  return {
    type: SAVE_USER,
    user
  };
};
const userSignupRequest = (formDetails) => {
  return dispatch => {
    return axios.post('/api/v1/user', formDetails)
    .then((response) => {
      const { user, message } = response.data;

      if (response.status === 201) {
        const token = response.data.jwt;
        localStorage.setItem('jwtToken', token);
        setAuthorizationToken(token);
        dispatch(userSignupRequestSuccess(user));
        toastr.success(message);
      }
    })
    .catch(function (error) {
      return error;
    });
  };
};

export { userSignupRequest };
