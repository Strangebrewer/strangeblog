import * as Post from '../action-types/postTypes';

export function postReducer(state = [], action) {
   switch (action.type) {
      case Post.SET_ALL_POSTS:
         return [...action.payload];
      case Post.ADD_POST_TO_POSTS:
         return [...state, action.payload];
      case Post.DELETE_POST:
         return state.filter(post => post.id !== action.payload);
      case Post.EDIT_POST_IN_POSTS:
         return state.map(post => {
            if (post.id === action.payload.id) {
               return action.payload;
            }
            return post;
         });
      case Post.EDIT_USER_TAGS_IN_POST:
         return state.map(post => {
            if (post.id === action.payload.id) {
               post = { ...post, userTags: action.payload.tags }
            }
            return post;
         });
      case Post.ADD_MORE_POSTS:
         return [...state, ...action.payload];
      default: return state;
   }
}

export function currentPostReducer(state = {}, action) {
   switch (action.type) {
      case Post.SET_CURRENT_POST:
         return { ...action.payload };
      default: return state;
   }
}
