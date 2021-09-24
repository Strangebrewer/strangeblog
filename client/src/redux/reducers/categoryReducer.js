import {
  SET_ALL_CATEGORIES,
  EDIT_CATEGORY_IN_CATEGORIES,
  ADD_CATEGORY
} from '../action-types/otherTypes';

export function categoryReducer(state = [], action) {
  switch (action.type) {
    case SET_ALL_CATEGORIES:
      return action.payload;
    case ADD_CATEGORY:
      return [...state, action.payload];
    case EDIT_CATEGORY_IN_CATEGORIES:
      return state.map(cat => {
        if (cat.id === action.payload.id) {
          console.log('cat.id === action.payload.id:::', cat.id === action.payload.id);
          return action.payload
        }
        return cat;
      });
    default: return state;
  }
}
