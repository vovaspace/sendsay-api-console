import { all, fork } from 'redux-saga/effects';

import { initWatch } from './init.saga';


export function* rootSaga() {
  yield all([
    fork(initWatch),
  ]);
}
