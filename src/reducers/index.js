import { combineReducers } from 'redux';

import { apiCaller } from './apiCaller.reducer';
import { auth } from './auth.reducer';
import { init } from './init.reducer';
import { requestsHistory } from './requestsHistory.reducer';


export const rootReducer = combineReducers({
  apiCaller,
  auth,
  init,
  requestsHistory,
});
