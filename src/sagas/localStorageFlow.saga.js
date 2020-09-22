import {
  take,
  all,
  call,
  select,
  put,
  spawn,
  debounce,
} from 'redux-saga/effects';

import { LOCAL_STORAGE_KEY, TIMEOUT } from '@/constants';
import { LocalStorageActions, RequestsHistoryActions } from '@/actions';
import { RequestsHistorySelectors } from '@/selectors';


function* set(key, successActionCreator) {
  try {
    const localStorageItem = localStorage.getItem(key);

    if (!localStorageItem) {
      throw new Error();
    }

    yield put(successActionCreator(
      JSON.parse(localStorageItem),
    ));
  } catch {}
}


function* setAll(setters) {
  yield all(setters.map(([key, successActionCreator]) => call(
    set,
    key,
    successActionCreator,
  )));
}


function* write(key, selector, pattern) {
  function* worker() {
    const items = yield select(selector);
    localStorage.setItem(key, JSON.stringify(items));
  }

  yield spawn(debounce, TIMEOUT.writeLocalStorage, pattern, worker);
}


export function* localStorageFlow() {
  /* Setting Flow */

  yield take(LocalStorageActions.startSetting);

  yield setAll([
    [
      LOCAL_STORAGE_KEY.requestsHistory,
      (items) => RequestsHistoryActions.setItems({ items }),
    ],
  ]);

  yield put(LocalStorageActions.doneSetting());


  /* Writing Flow */

  yield write(
    LOCAL_STORAGE_KEY.requestsHistory,
    RequestsHistorySelectors.selectItems,
    [
      RequestsHistoryActions.addItem,
      RequestsHistoryActions.removeItem,
      RequestsHistoryActions.clear,
    ],
  );
}
