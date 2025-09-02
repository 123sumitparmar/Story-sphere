import { AUTH, LOGOUT } from '../constants/ActionTypes';

const AuthReducer = (state = { authData: null }, action) => {
  switch (action.type) {
    case AUTH:
      // Save user data (e.g., JWT token, user info) to localStorage
      localStorage.setItem('profile', JSON.stringify({ ...action?.data }));
      return { ...state, authData: action?.data };

    case LOGOUT:
      // Clear the localStorage and reset authData
      localStorage.clear();
      return { ...state, authData: null };

    default:
      return state;
  }
};

export default AuthReducer;
