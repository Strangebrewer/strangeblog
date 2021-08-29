import { combineReducers } from 'redux';

import { authReducer, userReducer } from './authReducer';
import { postReducer, currentPostReducer } from './postReducer';

import { UNAUTHENTICATED } from '../action-types/authTypes';

const appReducer = combineReducers({
   auth: authReducer,
   post: currentPostReducer,
   posts: postReducer,
   user: userReducer,
});

const rootReducer = (state, action) => {
   if (action.type === UNAUTHENTICATED) {
      state = undefined;
   }
   return appReducer(state, action);
}

export default rootReducer;
