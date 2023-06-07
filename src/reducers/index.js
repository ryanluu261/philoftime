import { combineReducers } from '@reduxjs/toolkit';
import PostsReducer from './posts-reducer';
import AuthReducer from './auth-reducer';
import ErrorReducer from './error-reducer';

const rootReducer = combineReducers({
  posts: PostsReducer,
  auth: AuthReducer,
  error: ErrorReducer,
});

export default rootReducer;
