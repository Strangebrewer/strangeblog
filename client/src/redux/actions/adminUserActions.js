import {
  ADD_MORE_USERS,
  DELETE_USER,
  EDIT_USER,
  SET_ALL_USERS,
} from '../action-types/adminUserTypes';
import * as API from '../../api';

export function adminListUsers(query = {}, add) {
  return async dispatch => {
    try {
      const response = await API.user.adminListUsers(query);
      if (add) {
        dispatch({ type: ADD_MORE_USERS, payload: response.data.users });
      } else {
        dispatch({ type: SET_ALL_USERS, payload: response.data.users });
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

export function adminDeactivateUser(id, status) {
  return async dispatch => {
    try {
      const response = await API.user.adminDeactivateUser(id, status);
      dispatch({ type: EDIT_USER, payload: response.data });
      return response.data;
    } catch (e) {
      console.log('e in getCategories:::', e);
    }
  }
}

export function adminDeleteUser(id) {
  return async dispatch => {
    try {
      const response = await API.user.adminDeleteUser(id);
      dispatch({ type: DELETE_USER, payload: id });
      return response.data;
    } catch (e) {
      console.log('e in adminDeleteUser:::', e);
    }
  }
}