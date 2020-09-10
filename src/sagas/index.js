import { spawn } from 'redux-saga/effects';

import { authFlow } from './authFlow.saga';
import { initFlow } from './initFlow.saga';


export function* rootSaga() {
  yield spawn(authFlow);
  yield spawn(initFlow);
}
