import {
   SET_BLOG_DATA,
   SET_ALL_CATEGORIES,
   ADD_CATEGORY,
   DELETE_CATEGORY,
   EDIT_CATEGORY_IN_CATEGORIES,
   SET_SEARCH_CRITERIA,
   SET_SEARCH_COUNT
} from '../action-types/otherTypes';
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

export function saveCategory(data) {
   return async dispatch => {
      try {
         let response;
         if (data.id) {
            response = await API.category.edit(data);
            dispatch({ type: EDIT_CATEGORY_IN_CATEGORIES, payload: response.data });
         } else {
            response = await API.category.create(data);
            dispatch({ type: ADD_CATEGORY, payload: response.data });
         }
         return response.data;
      } catch (e) {
         console.log('e in saveCategory:::', e);
      }
   }
}

export function deleteCategory(id) {
   return async dispatch => {
      try {
         await API.category.destroy(id);
         dispatch({ type: DELETE_CATEGORY, payload: id });
         return
      } catch (e) {
         console.log('e in deleteCategory:::', e);
      }
   }
}

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
