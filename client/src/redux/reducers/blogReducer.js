import { SET_BLOG_DATA } from '../action-types/otherTypes';

export function blogReducer(state = {}, action) {
  switch (action.type) {
    case SET_BLOG_DATA:
      return action.payload;
    default: return state;
  }
}
