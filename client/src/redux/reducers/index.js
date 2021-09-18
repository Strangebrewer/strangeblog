import { combineReducers } from 'redux';

import { authReducer, userReducer } from './authReducer';
import { postReducer, currentPostReducer } from './postReducer';
import {
   blogReducer,
   categoryReducer,
   countReducer,
   searchCriteriaReducer
} from './otherReducer';

// import { UNAUTHENTICATED } from '../action-types/authTypes';

const appReducer = combineReducers({
   auth: authReducer,
   blog: blogReducer,
   categories: categoryReducer,
   count: countReducer,
   post: currentPostReducer,
   posts: postReducer,
   criteria: searchCriteriaReducer,
   user: userReducer,
});

const rootReducer = (state, action) => {
   // if (action.type === UNAUTHENTICATED) {
   //    state = undefined;
   // }
   return appReducer(state, action);
}

export default rootReducer;
