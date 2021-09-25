import {
  SET_ALL_USERS,
  EDIT_USER,
  ADD_MORE_USERS
} from '../action-types/adminUserTypes';
import * as API from '../../api';

export function adminListUsers(query = {}, add) {
  return async dispatch => {
    try {
      const response = await API.user.adminListUsers(query);
      if (add) {
        dispatch({ type: ADD_MORE_USERS, payload: response.data });
      } else {
        dispatch({ type: SET_ALL_USERS, payload: response.data });
      }
      return response.data;
    } catch (e) {
      console.log('e in getCategories:::', e);
    }
  }
}

export function adminUpdateUser(data) {
  return async dispatch => {
    try {
      const response = await API.user.adminUpdateUser(data);
      dispatch({ type: EDIT_USER, payload: response.data });
      return response.data;
    } catch (e) {
      console.log('e in getCategories:::', e);
    }
  }
}

export function adminDestroyUser(id, status) {
  return async dispatch => {
    try {
      const response = await API.user.adminDestroyUser(id, status);
      dispatch({ type: EDIT_USER, payload: response.data });
      return response.data;
    } catch (e) {
      console.log('e in getCategories:::', e);
    }
  }
}