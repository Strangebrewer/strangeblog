import {
  SET_ALL_CATEGORIES,
  ADD_CATEGORY,
  DELETE_CATEGORY,
  EDIT_CATEGORY_IN_CATEGORIES,
} from '../action-types/categoryTypes';
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