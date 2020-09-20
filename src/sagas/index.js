import { spawn } from 'redux-saga/effects';

import { authFlow } from './authFlow.saga';
import { initFlow } from './initFlow.saga';
import { requestsHistoryLocalStorageFlow } from './requestsHistoryLocalStorageFlow.saga';

import { addRequestsHistoryItemWatcher } from './addRequestsHistoryItemWatcher.saga';
import { callApiWatcher } from './callApiWatcher.saga';


export function* rootSaga() {
  yield spawn(authFlow);
  yield spawn(initFlow);
  yield spawn(requestsHistoryLocalStorageFlow);

  yield spawn(addRequestsHistoryItemWatcher);
  yield spawn(callApiWatcher);
}
