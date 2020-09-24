import { take, all, put } from 'redux-saga/effects';

import {
  InitActions,
  AuthActions,
  LocalStorageActions,
} from '@/actions';


export function* initFlow() {
  yield take(InitActions.startInit);

  yield all([
    put(AuthActions.retrieveSessionRequest()),
    put(LocalStorageActions.startSetting()),
  ]);

  yield all([
    take([
      AuthActions.retrieveSessionSuccess,
      AuthActions.retrieveSessionFailure,
    ]),

    take(LocalStorageActions.doneSetting),
  ]);

  yield put(InitActions.doneInit());
}
