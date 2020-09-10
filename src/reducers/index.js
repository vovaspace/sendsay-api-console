import { combineReducers } from 'redux';

import { initialization } from './initialization.reducer';


export const rootReducer = combineReducers({
  initialization,
});
