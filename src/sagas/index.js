import { spawn } from 'redux-saga/effects';

import { authFlow } from './authFlow.saga';
import { initFlow } from './initFlow.saga';
import { localStorageFlow } from './localStorageFlow.saga';

import { apiCallWatcher } from './apiCallWatcher.saga';
import { clipboardCopyingWatcher } from './clipboardCopyingWatcher.saga';
import { requestsHistoryItemsAddingWatcher } from './requestsHistoryItemsAddingWatcher.saga';
import { requestsHistoryNotificationsWatcher } from './requestsHistoryNotificationsWatcher.saga';


export function* rootSaga() {
  yield spawn(authFlow);
  yield spawn(initFlow);
  yield spawn(localStorageFlow);

  yield spawn(apiCallWatcher);
  yield spawn(clipboardCopyingWatcher);
  yield spawn(requestsHistoryItemsAddingWatcher);
  yield spawn(requestsHistoryNotificationsWatcher);
}
