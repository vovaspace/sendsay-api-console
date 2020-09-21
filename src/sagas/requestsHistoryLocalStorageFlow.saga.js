import {
  take,
  call,
  put,
  debounce,
  select,
} from 'redux-saga/effects';

import { DEBOUNCE_TIME, LOCAL_STORAGE_KEY } from '@/constants';
import { RequestsHistoryActions } from '@/actions';
import { RequestsHistorySelectors } from '@/selectors';


function* setFromLocalStorage() {
  try {
    // Without 'call' because 'Illegal invocation'
    const localStorageItem = localStorage.getItem(LOCAL_STORAGE_KEY.requestsHistory);

    if (!localStorageItem) {
      throw new Error();
    }

    const items = yield call(JSON.parse, localStorageItem);
    yield put(RequestsHistoryActions.setFromLocalStorageSuccess({ items }));
  } catch (error) {
    yield put(RequestsHistoryActions.setFromLocalStorageFailure());
  }
}


function* writeToLocalStorage() {
  const items = yield select(RequestsHistorySelectors.selectItems);

  // Without 'call' because 'Illegal invocation'
  localStorage.setItem(LOCAL_STORAGE_KEY.requestsHistory, JSON.stringify(items));
}


export function* requestsHistoryLocalStorageFlow() {
  yield take(RequestsHistoryActions.setFromLocalStorageRequest);
  yield call(setFromLocalStorage);

  yield debounce(DEBOUNCE_TIME.writeLocalStorage, [
    RequestsHistoryActions.addItem,
    RequestsHistoryActions.removeItem,
    RequestsHistoryActions.clear,
  ], writeToLocalStorage);
}
