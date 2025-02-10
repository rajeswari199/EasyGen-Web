import { combineReducers } from '@reduxjs/toolkit';

//reducers
import { USER_DETAILS, userReducer } from './userSlice';

export const reducers = combineReducers({
  [USER_DETAILS]: userReducer,
});
