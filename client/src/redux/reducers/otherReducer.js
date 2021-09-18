import {
  SET_BLOG_DATA,
  SET_ALL_CATEGORIES,
  SET_SEARCH_CRITERIA,
  SET_SEARCH_COUNT
} from '../action-types/otherTypes';
import { getBasicSearchCriteria } from '../../utils/halp';

export function blogReducer(state = {}, action) {
  switch (action.type) {
    case SET_BLOG_DATA:
      return action.payload;
    default: return state;
  }
}

export function categoryReducer(state = {}, action) {
  switch (action.type) {
    case SET_ALL_CATEGORIES:
      return action.payload;
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
