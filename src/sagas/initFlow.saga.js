import { take, all, put } from 'redux-saga/effects';

import {
  InitActions,
  AuthActions,
  RequestsHistoryActions,
} from '@/actions';


export function* initFlow() {
  yield take(InitActions.startInit);

  yield all([
    put(AuthActions.retrieveSessionRequest()),
    put(RequestsHistoryActions.setFromLocalStorageRequest()),
  ]);

  yield all([
    take([
      AuthActions.retrieveSessionSuccess,
      AuthActions.retrieveSessionFailure,
    ]),

    take([
      RequestsHistoryActions.setFromLocalStorageSuccess,
      RequestsHistoryActions.setFromLocalStorageFailure,
    ]),
  ]);

  yield put(InitActions.doneInit());
}
