import {
  takeEvery,
  put,
  delay,
} from 'redux-saga/effects';

import { TIMEOUT } from '@/constants';
import { RequestsHistoryActions } from '@/actions';


function* removeNotification({ payload: { id } }) {
  yield delay(TIMEOUT.quickNotification);
  yield put(RequestsHistoryActions.removeNotification({ id }));
}


export function* requestsHistoryNotificationsWatcher() {
  yield takeEvery(RequestsHistoryActions.addNotification, removeNotification);
}
