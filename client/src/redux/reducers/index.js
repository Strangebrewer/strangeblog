import { combineReducers } from 'redux';

import { authReducer, userReducer } from './authReducer';
import { categoryReducer } from './categoryReducer';
import { postReducer, currentPostReducer, editingPostReducer } from './postReducer';

import { UNAUTHENTICATED } from '../action-types/authTypes';

const appReducer = combineReducers({
   auth: authReducer,
   post: currentPostReducer,
   editing: editingPostReducer,
   posts: postReducer,
   user: userReducer,
   categories: categoryReducer
});

const rootReducer = (state, action) => {
   if (action.type === UNAUTHENTICATED) {
      state = undefined;
   }
   return appReducer(state, action);
}

export default rootReducer;
