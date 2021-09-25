import {
  ADD_CATEGORY,
  DELETE_CATEGORY,
  EDIT_CATEGORY_IN_CATEGORIES,
  SET_ALL_CATEGORIES,
} from '../action-types/categoryTypes';

export function categoryReducer(state = [], action) {
  switch (action.type) {
    case SET_ALL_CATEGORIES:
      return action.payload;
    case ADD_CATEGORY:
      return [...state, action.payload];
    case EDIT_CATEGORY_IN_CATEGORIES:
      return state.map(cat => {
        if (cat.id === action.payload.id) {
          return action.payload
        }
        return cat;
      });
    case DELETE_CATEGORY:
      return state.filter(cat => cat.id !== action.payload);
    default: return state;
  }
}