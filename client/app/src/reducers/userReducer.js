import isEmpty from 'lodash/isEmpty';
import { SAVE_USER } from '../constants/actionTypes';


const initialState = {
  user: {},
  isAuth: false
};

const userReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case SAVE_USER:
      const { user } = action;
      return { ...state,
        user,
        isAuth: !isEmpty(user)
      };
    default:
      return state;
  }
};

export default userReducer;
