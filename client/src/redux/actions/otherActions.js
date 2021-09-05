import { SET_BLOG_DATA, SET_ALL_CATEGORIES } from '../action-types/otherTypes';
import * as API from '../../api';

export function getCategories() {
   return async dispatch => {
      try {
         const response = await API.category.get();
         dispatch({ type: SET_ALL_CATEGORIES, payload: response.data });
         return response.data;
      } catch (e) {
        console.log('e in getCategories:::', e);
      }
   }
}

export function getBlogData() {
   return async dispatch => {
      try {
         const response = await API.blog.get();
         dispatch({ type: SET_BLOG_DATA, payload: response.data[0] });
         dispatch({ type: SET_ALL_CATEGORIES, payload: response.data[0].categories });
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
