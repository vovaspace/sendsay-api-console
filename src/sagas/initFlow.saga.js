import { put, take } from 'redux-saga/effects';

import { InitActions, AuthActions } from '@/actions';


export function* initFlow() {
  yield take(InitActions.startInit);

  yield put(AuthActions.retrieveSessionRequest());
  yield take([AuthActions.retrieveSessionSuccess, AuthActions.retrieveSessionFailure]);

  yield put(InitActions.doneInit());
}
