import {
  put,
  take,
  call,
  fork,
  cancel,
} from 'redux-saga/effects';

import { COOKIE_NAME } from '@/constants';
import { sendsay, parseError } from '@/utils';
import { AuthActions } from '@/actions';


function setSession(session) {
  document.cookie = `${COOKIE_NAME.session}=${session || ''}`;
  sendsay.setSession(session);
}


function* pong() {
  return yield call(sendsay.request, { action: 'pong' });
}


function* retrieveSession() {
  try {
    // Without 'call' because 'this' is lost
    sendsay.setSessionFromCookie(COOKIE_NAME.session);
    const { account, sublogin } = yield call(pong);

    yield put(AuthActions.retrieveSessionSuccess({
      user: {
        account,
        sublogin: account === sublogin ? null : sublogin,
      },
    }));
  } catch (error) {
    yield put(AuthActions.retrieveSessionFailure({ error: null }));
  }
}


function* login(payload) {
  try {
    const { session } = yield call(sendsay.request, {
      action: 'login',
      login: payload.login,
      sublogin: payload.sublogin,
      passwd: payload.password,
    });

    yield call(setSession, session);
    const { account, sublogin } = yield call(pong);

    yield put(AuthActions.loginSuccess({
      user: {
        account,
        sublogin: payload.sublogin ? sublogin : null,
      },
    }));
  } catch (error) {
    yield put(AuthActions.loginFailure({ error: parseError(error) }));
  }
}


function* logout() {
  try {
    yield call(sendsay.request, { action: 'logout' });
    yield call(setSession, null);
    yield put(AuthActions.logoutSuccess());
  } catch (error) {
    yield put(AuthActions.logoutFailure({ error: parseError(error) }));
  }
}


export function* authFlow() {
  /* Retrieve Session Flow */

  yield take(AuthActions.retrieveSessionRequest);
  yield fork(retrieveSession);


  while (true) {
    /* Login Flow */

    const loginAction = yield take([
      AuthActions.retrieveSessionSuccess,
      AuthActions.loginRequest,
    ]);

    // Fork login if the session is not retrieved
    const loginTask = loginAction.type === AuthActions.loginRequest.type
      ? yield fork(login, loginAction.payload)
      : null;


    /* Logout Flow */

    while (true) {
      const logoutStartAction = yield take([
        AuthActions.loginFailure,
        AuthActions.logoutRequest,
      ]);

      // Go back to 'loginRequest' if there is a login failure
      if (logoutStartAction.type === AuthActions.loginFailure.type) {
        break;
      }

      if (loginTask) {
        yield cancel(loginTask);
      }

      yield fork(logout);

      const logoutEndAction = yield take([
        AuthActions.logoutSuccess,
        AuthActions.logoutFailure,
      ]);

      // Go back to 'loginRequest' if there is a logout success
      if (logoutEndAction.type === AuthActions.logoutSuccess.type) {
        break;
      }
    }
  }
}
