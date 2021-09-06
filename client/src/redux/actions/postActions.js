import * as Post from '../action-types/postTypes';
import * as API from '../../api';

export function getOnePost(id) {
  return async dispatch => {
    try {
      const response = await API.post.getOne(id);
      dispatch({ type: Post.SET_CURRENT_POST, payload: response.data });
      return response.data;
    } catch (e) {

    }
  }
}

export function listPosts(query = {}) {
  return async dispatch => {
    try {
      const response = await API.post.get(query);
      dispatch({ type: Post.SET_ALL_POSTS, payload: response.data.posts });
      return response.data;
    } catch (e) {

    }
  }
}

export function getOnePublicPost(id) {
  return async dispatch => {
    try {
      const response = await API.post.getOnePublicPost(id);
      dispatch({ type: Post.SET_CURRENT_POST, payload: response.data });
      return response.data;
    } catch (e) {

    }
  }
}

export function listPublicPosts(query = {}) {
  return async dispatch => {
    try {
      const response = await API.post.listPublicPosts(query);
      dispatch({ type: Post.SET_ALL_POSTS, payload: response.data.posts });
      return response.data;
    } catch (e) {

    }
  }
}

export function savePost(data) {
  return async dispatch => {
    try {
      let response;
      console.log('data:::', data);

      if (data.id) {
        // set immediately for smooth UI transition
        // dispatch({ type: Post.EDIT_POST_IN_POSTS, payload: data });
        // dispatch({ type: Post.SET_CURRENT_POST, payload: data });
        response = await API.post.edit(data);

        // set accurately with db response. They should be the same.
        dispatch({ type: Post.EDIT_POST_IN_POSTS, payload: response.data });
        dispatch({ type: Post.SET_CURRENT_POST, payload: response.data });

      } else {
        response = await API.post.create(data);
        dispatch({ type: Post.ADD_POST_TO_POSTS, payload: response.data });
      }
      console.log('response:::', response);
      return response.data;
    } catch (e) {
      console.log('e in savePost:::', e);
    }
  }
}

export function destroyPost(id) {
  return async dispatch => {
    try {
      await API.post.destroy(id);
      dispatch({ type: Post.DELETE_POST, payload: id });
    } catch (e) {

    }
  }
}
