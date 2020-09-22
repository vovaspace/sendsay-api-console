import {
  takeLatest,
  put,
  call,
  select,
} from 'redux-saga/effects';

import { CALL_STATUS } from '@/constants';
import { sendsay, parseError } from '@/utils';
import { ApiCallerActions } from '@/actions';
import { ApiCallerSelectors } from '@/selectors';


function* getRequest() {
  try {
    const request = yield select(ApiCallerSelectors.selectRequestValue);
    return JSON.parse(request);
  } catch {
    return null;
  }
}


function* callApi() {
  const request = yield call(getRequest);

  if (!request) {
    yield put(ApiCallerActions.makeCallFailure());
    return;
  }

  try {
    const response = yield call(sendsay.request, request);

    yield put(ApiCallerActions.makeCallSuccess({
      request,
      response,
      status: CALL_STATUS.success,
    }));
  } catch (error) {
    // 'success' because there is a 'response'.
    yield put(ApiCallerActions.makeCallSuccess({
      request,
      response: parseError(error),
      status: CALL_STATUS.error,
    }));
  }
}


export function* callApiWatcher() {
  yield takeLatest(ApiCallerActions.makeCallRequest, callApi);
}
