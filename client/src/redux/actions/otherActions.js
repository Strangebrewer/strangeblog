import {
   SET_BLOG_DATA,
   SET_SEARCH_CRITERIA,
   SET_SEARCH_COUNT
} from '../action-types/otherTypes';
import { SET_ALL_CATEGORIES } from '../action-types/categoryTypes';
import * as API from '../../api';

export function getBlogData() {
   return async dispatch => {
      try {
         const response = await API.blog.get();
         dispatch({ type: SET_BLOG_DATA, payload: response.data.blog });
         dispatch({ type: SET_ALL_CATEGORIES, payload: response.data.categories });
         return response.data;
      } catch (e) {
         console.log('e in getBlogData:::', e);
      }
   }
}

export function saveBlogData(data) {
   return async dispatch => {
      try {
         const response = await API.blog.edit(data);
         dispatch({ type: SET_BLOG_DATA, payload: response.data });
         return response.data;
      } catch (e) {
         console.log('e in saveBlogData:::', e);
      }
   }
}

export function setSearchCriteria(critieria) {
   return async dispatch => {
      dispatch({ type: SET_SEARCH_CRITERIA, payload: critieria });
   }
}

export function setCount(count) {
   return dispatch => {
      dispatch({ type: SET_SEARCH_COUNT, payload: count });
   }
}
