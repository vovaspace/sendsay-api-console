import { combineReducers } from 'redux';

import { apiCaller } from './apiCaller.reducer';
import { auth } from './auth.reducer';
import { init } from './init.reducer';


export const rootReducer = combineReducers({
  apiCaller,
  auth,
  init,
});
