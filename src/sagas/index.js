import { spawn } from 'redux-saga/effects';

import { authFlow } from './authFlow.saga';
import { initFlow } from './initFlow.saga';
import { localStorageFlow } from './localStorageFlow.saga';

import { callApiWatcher } from './callApiWatcher.saga';
import { requestsHistoryItemsAddingWatcher } from './requestsHistoryItemsAddingWatcher.saga';


export function* rootSaga() {
  yield spawn(authFlow);
  yield spawn(initFlow);
  yield spawn(localStorageFlow);

  yield spawn(callApiWatcher);
  yield spawn(requestsHistoryItemsAddingWatcher);
}
