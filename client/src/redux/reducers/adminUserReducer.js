import {
  ADD_MORE_USERS,
  DELETE_USER,
  EDIT_USER,
  SET_ALL_USERS
} from '../action-types/adminUserTypes';

export function adminUserReducer(state = [], action) {
  switch (action.type) {
    case ADD_MORE_USERS:
      return [...state, ...action.payload];
    case DELETE_USER:
      return state.filter(user => user.id !== action.payload);
    case EDIT_USER:
      return state.map(user => {
        if (user.id === action.payload.id) {
          return action.payload;
        }
        return user;
      });
    case SET_ALL_USERS:
      return action.payload;
    default: return state;
  }
}