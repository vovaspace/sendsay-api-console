import { combineReducers } from 'redux';

import { auth } from './auth.reducer';
import { init } from './init.reducer';


export const rootReducer = combineReducers({
  auth,
  init,
});
