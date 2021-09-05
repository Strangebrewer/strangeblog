import { combineReducers } from 'redux';

import { authReducer, userReducer } from './authReducer';
import { categoryReducer } from './categoryReducer';
import { postReducer, currentPostReducer } from './postReducer';
import { blogReducer } from './blogReducer';

// import { UNAUTHENTICATED } from '../action-types/authTypes';

const appReducer = combineReducers({
   auth: authReducer,
   post: currentPostReducer,
   posts: postReducer,
   user: userReducer,
   categories: categoryReducer,
   blog: blogReducer
});

const rootReducer = (state, action) => {
   // if (action.type === UNAUTHENTICATED) {
   //    state = undefined;
   // }
   return appReducer(state, action);
}

export default rootReducer;
