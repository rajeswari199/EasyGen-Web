import { configureStore } from '@reduxjs/toolkit';

import { reducers } from './redux/combineReducer';

export const store = configureStore({
  reducer: reducers,
});
