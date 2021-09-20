import * as Source from '../action-types/sourceTypes';
import * as API from '../../api';

export function listSources() {
   return async dispatch => {
      try {
         const response = await API.source.get();
         dispatch({ type: Source.SET_ALL_SOURCES, payload: response.data });
         return response.data;
      } catch (e) {
        console.log('e in sourceActions listSources:::', e);
      }
   }
}

export function save(data) {
  return async dispatch => {
    try {
      let response;
      if (data.id) {
        response = await API.source.edit(data);
        dispatch({ type: Source.ADD_SOURCE_TO_SOURCES, payload: response.data });
      } else {
        response = await API.source.create(data);
        dispatch({ type: Source.EDIT_SOURCE_IN_SOURCES, payload: response.data });
      }
      return response.data;
    } catch (e) {
      console.log('e in sourceActions save:::', e);
    }
  }
}

export function deleteSource(id) {
  return async dispatch => {
    try {
      const response = await API.source.destroy(id);
      dispatch({ type: Source.DELETE_SOURCE, payload: id });
      return response.data;
    } catch (e) {
      console.log('e in sourceActions deleteSource:::', e);
    }
  }
}
