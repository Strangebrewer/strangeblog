import { SET_ALL_CATEGORIES } from '../action-types/otherTypes';

export function categoryReducer(state = {}, action) {
  switch (action.type) {
     case SET_ALL_CATEGORIES:
        return action.payload;
     default: return state;
  }
}
