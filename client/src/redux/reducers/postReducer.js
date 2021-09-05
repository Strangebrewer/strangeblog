import * as Post from '../action-types/postTypes';

export function postReducer(state = [], action) {
   switch (action.type) {
      case Post.SET_ALL_POSTS:
         return [...action.payload];
      case Post.ADD_POST_TO_POSTS:
         return [...state, action.payload];
      case Post.DELETE_POST:
         return state.filter(a => a.id !== action.payload);
      case Post.EDIT_POST_IN_POSTS:
         return state.map(a => {
            if (a.id === action.payload.id) {
               return action.payload;
            }
            return a;
         });
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
