import { take, put } from 'redux-saga/effects';

import { ApiCallerActions, RequestsHistoryActions } from '@/actions';


export function* requestsHistoryItemsAddingWatcher() {
  while (true) {
    const { payload: { request, status } } = yield take(ApiCallerActions.makeCallSuccess);
    yield put(RequestsHistoryActions.addItem({ request, status }));
  }
}
