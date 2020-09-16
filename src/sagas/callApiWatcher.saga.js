import {
  takeEvery,
  put,
  call,
  select,
} from 'redux-saga/effects';

import { CALL_STATUS } from '@/constants';
import { sendsay } from '@/utils';
import { ApiCallerActions } from '@/actions';
import { ApiCallerSelectors } from '@/selectors';


function* getBody() {
  try {
    const request = yield select(ApiCallerSelectors.selectRequestValue);
    const body = yield call(JSON.parse, request);

    return body;
  } catch (error) {
    yield put(ApiCallerActions.makeCallFailure({ status: CALL_STATUS.invalid }));
    return null;
  }
}


function* callApi() {
  try {
    const body = yield call(getBody);

    if (!body) {
      return;
    }

    const response = yield call(sendsay.request, body);
    yield put(ApiCallerActions.makeCallSuccess({ response }));
  } catch (error) {
    yield put(ApiCallerActions.makeCallFailure({ response: error, status: CALL_STATUS.error }));
  }
}


export function* callApiWatcher() {
  yield takeEvery(ApiCallerActions.makeCallRequest, callApi);
}
