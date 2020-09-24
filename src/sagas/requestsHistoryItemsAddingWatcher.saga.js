import { take, put } from 'redux-saga/effects';

import { stringifyCall } from '@/utils';
import { ApiCallerActions, RequestsHistoryActions } from '@/actions';


export function* requestsHistoryItemsAddingWatcher() {
  while (true) {
    const { payload: { request, status } } = yield take(ApiCallerActions.makeCallSuccess);

    yield put(RequestsHistoryActions.addItem({
      action: request.action ?? 'unknown',
      request: stringifyCall(request),
      status,
    }));
  }
}
