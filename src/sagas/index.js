import { spawn } from 'redux-saga/effects';

import { authFlow } from './authFlow.saga';
import { initFlow } from './initFlow.saga';
import { localStorageFlow } from './localStorageFlow.saga';

import { apiCallWatcher } from './apiCallWatcher.saga';
import { requestsHistoryItemsAddingWatcher } from './requestsHistoryItemsAddingWatcher.saga';


export function* rootSaga() {
  yield spawn(authFlow);
  yield spawn(initFlow);
  yield spawn(localStorageFlow);

  yield spawn(apiCallWatcher);
  yield spawn(requestsHistoryItemsAddingWatcher);
}
