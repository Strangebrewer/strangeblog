import * as Auth from '../action-types/authTypes';

export function authReducer(state = {}, action) {
   switch (action.type) {
      case Auth.AUTHENTICATED:
         return { authenticated: true }
      case Auth.UNAUTHENTICATED:
         return { authenticated: false }
      case Auth.LOGIN_ERROR:
         return { ...state, loginError: action.payload }
      case Auth.SIGNUP_ERROR:
            return { ...state, signupError: action.payload }
      default: return state;
   }
}

export function userReducer(state = {}, action) {
   switch (action.type) {
      case Auth.SET_CURRENT_USER:
         return {
            ...state,
            ...action.payload
         }
      case Auth.LOGIN_USER:
         return {
            ...state,
            ...action.payload
         }
      case Auth.SIGNUP_USER:
         return {
            ...state,
            ...action.payload
         }
      case Auth.LOGOUT:
         return {};
      default: return state;
   }
}