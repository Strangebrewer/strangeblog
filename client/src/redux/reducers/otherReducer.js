import {
  ADD_CATEGORY,
  DELETE_CATEGORY,
  EDIT_CATEGORY_IN_CATEGORIES,
  SET_ALL_CATEGORIES,
  SET_BLOG_DATA,
  SET_SEARCH_COUNT,
  SET_SEARCH_CRITERIA,
} from '../action-types/otherTypes';
import { getBasicSearchCriteria } from '../../utils/halp';

export function blogReducer(state = {}, action) {
  switch (action.type) {
    case SET_BLOG_DATA:
      return action.payload;
    default: return state;
  }
}

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

export function searchCriteriaReducer(state = getBasicSearchCriteria(), action) {
  switch (action.type) {
    case SET_SEARCH_CRITERIA:
      return action.payload;
    default: return state;
  }
}

export function countReducer(state = 0, action) {
  switch (action.type) {
    case SET_SEARCH_COUNT:
      return action.payload;
    default: return state;
  }
}
