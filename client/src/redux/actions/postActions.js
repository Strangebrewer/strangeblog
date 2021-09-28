import * as Auth from '../action-types/authTypes';
import { SET_SEARCH_COUNT } from '../action-types/otherTypes';
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

export function listPosts(query = {}, add) {
  return async dispatch => {
    try {
      const response = await API.post.listPosts(query);
      if (add) {
        dispatch({ type: Post.ADD_MORE_POSTS, payload: response.data.posts });
      } else {
        dispatch({ type: Post.SET_ALL_POSTS, payload: response.data.posts });
      }
      return response.data;
    } catch (e) {

    }
  }
}

export function listPublicPosts(query = {}, add) {
  return async dispatch => {
    try {
      const response = await API.post.listPublicPosts(query);
      if (add) {
        dispatch({ type: Post.ADD_MORE_POSTS, payload: response.data.posts });
      } else {
        dispatch({ type: Post.SET_ALL_POSTS, payload: response.data.posts });
      }
      return response.data;
    } catch (e) {

    }
  }
}

export function savePost(data) {
  return async dispatch => {
    try {
      let response;
      console.log('data in postActions.js savePost:::', data);

      if (data.id) {
        // set immediately for smooth UI transition
        response = await API.post.edit(data);
        console.log('response in postActions.js savePost:::', response);

        // set accurately with db response. They should be the same.
        dispatch({ type: Post.EDIT_POST_IN_POSTS, payload: response.data });
        dispatch({ type: Post.SET_CURRENT_POST, payload: response.data });

      } else {
        response = await API.post.create(data);
        dispatch({ type: Post.ADD_POST_TO_POSTS, payload: response.data });
      }
      return response.data;
    } catch (e) {
      console.log('e in savePost:::', e);
    }
  }
}

export function saveUserTags(userId, data) {
  return async dispatch => {
    try {
      console.log('data in saveUserTags:::', data);
      const response = await API.user.updateUserTags(userId, data);
      dispatch({ type: Auth.SET_CURRENT_USER, payload: response.data });
      dispatch({ type: Post.EDIT_USER_TAGS_IN_POST, payload: data });
      console.log('response:::', response);
    } catch (e) {

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
