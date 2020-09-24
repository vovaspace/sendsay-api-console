import {
  takeLatest,
  call,
  put,
} from 'redux-saga/effects';

import { ClipboardActions } from '@/actions';


function write(text) {
  return navigator.clipboard.writeText(text);
}


function* copyToClipboard({ payload: { text, actionSuccess, actionFailure } }) {
  try {
    yield call(write, text);
    yield put(actionSuccess);
  } catch {
    yield put(actionFailure);
  }
}


export function* clipboardCopyingWatcher() {
  yield takeLatest(ClipboardActions.copy, copyToClipboard);
}
