import {
  takeEvery,
  put,
  call,
  select,
} from 'redux-saga/effects';

import { sendsay, parseError } from '@/utils';
import { ApiCallerActions } from '@/actions';
import { ApiCallerSelectors } from '@/selectors';


function* getBody() {
  try {
    const request = yield select(ApiCallerSelectors.selectRequestValue);
    const body = yield call(JSON.parse, request);

    return body;
  } catch (error) {
    return null;
  }
}


function* callApi() {
  const body = yield call(getBody);

  if (!body) {
    yield put(ApiCallerActions.makeCallFailureInvalid());
    return;
  }

  try {
    const response = yield call(sendsay.request, body);
    yield put(ApiCallerActions.makeCallSuccess({ response }));
  } catch (error) {
    yield put(ApiCallerActions.makeCallFailureError({ response: parseError(error) }));
  }
}


export function* callApiWatcher() {
  yield takeEvery(ApiCallerActions.makeCallRequest, callApi);
}
