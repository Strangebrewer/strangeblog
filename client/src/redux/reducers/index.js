import { combineReducers } from 'redux';

import { adminUserReducer } from './adminUserReducer';
import { authReducer, userReducer } from './authReducer';
import { postReducer, currentPostReducer } from './postReducer';
import {
   blogReducer,
   countReducer,
   searchCriteriaReducer
} from './otherReducer';
import { categoryReducer } from './categoryReducer';
import { sourceReducer } from './sourceReducer';

// import { UNAUTHENTICATED } from '../action-types/authTypes';

const appReducer = combineReducers({
   auth: authReducer,
   blog: blogReducer,
   categories: categoryReducer,
   count: countReducer,
   criteria: searchCriteriaReducer,
   post: currentPostReducer,
   posts: postReducer,
   sources: sourceReducer,
   user: userReducer,
   adminUsers: adminUserReducer
});

const rootReducer = (state, action) => {
   // if (action.type === UNAUTHENTICATED) {
   //    state = undefined;
   // }
   return appReducer(state, action);
}

export default rootReducer;
