import {
  ADD_MORE_USERS,
  EDIT_USER,
  SET_ALL_USERS
} from '../action-types/adminUserTypes';

export function adminUserReducer(state = [], action) {
  switch (action.type) {
    case ADD_MORE_USERS:
      return [...state, action.payload];
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