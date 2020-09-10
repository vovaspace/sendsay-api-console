import { takeLatest, put, delay } from 'redux-saga/effects';

import { InitializationActions } from '@/actions';


function* init() {
  try {
    yield delay(2000);
    yield put(InitializationActions.initSuccess());
  } catch (error) {
    yield put(InitializationActions.initFailure({ error: error.message }));
  }
}


export function* initWatch() {
  yield takeLatest(InitializationActions.initRequest, init);
}
