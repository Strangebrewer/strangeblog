import * as Auth from '../action-types/authTypes';
import { SET_ALL_CATEGORIES } from '../action-types/otherTypes';
import * as API from '../../api';
import { setAuthToken, resetAuthToken } from '../../utils/token';

export function getCurrentUser() {
   return async dispatch => {
      try {
         const response = await API.user.me();
         dispatch({ type: Auth.AUTHENTICATED });
         dispatch({ type: Auth.SET_CURRENT_USER, payload: response.data.user });
      } catch (e) {
         dispatch({ type: Auth.UNAUTHENTICATED });
      }
   }
}

export function signup(signup_data, history) {
   return async dispatch => {
      try {
         const response = await API.user.register(signup_data);
         setAuthToken(response.data.token);
         dispatch({ type: Auth.SET_CURRENT_USER, payload: response.data.user });
         dispatch({ type: Auth.AUTHENTICATED });
      } catch (e) {
         dispatch({
            type: Auth.SIGNUP_ERROR,
            payload: e.response.data.message
         });
      }
   }
}

export function login(credentials) {
   return async dispatch => {
      try {
         const response = await API.user.login(credentials);
         setAuthToken(response.data.token);
         dispatch({ type: Auth.SET_CURRENT_USER, payload: response.data.user });
         dispatch({ type: Auth.AUTHENTICATED });
      } catch (e) {
         dispatch({
            type: Auth.LOGIN_ERROR,
            payload: e.response.data.message
         });
      }
   }
}

export function logout() {
   return dispatch => {
      resetAuthToken();
      dispatch({ type: Auth.UNAUTHENTICATED });
      dispatch({ type: Auth.LOGOUT });
   }
}

export function setError(errorMsg, signup) {
   let type = signup ? Auth.SIGNUP_ERROR : Auth.LOGIN_ERROR;
   return dispatch => {
      dispatch({ type, payload: errorMsg })
   }
}