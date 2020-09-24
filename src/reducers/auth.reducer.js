import { createReducer } from '@reduxjs/toolkit';

import { LOADING_STATE } from '@/constants';
import { combineCases } from '@/utils';
import { AuthActions } from '@/actions';


const initialState = {
  loadingState: LOADING_STATE.notAsked,
  isAuthed: false,
  error: null,
  user: null,
};


export const auth = createReducer(initialState, (builder) => builder
  .addCase(AuthActions.logoutSuccess, () => ({ ...initialState }))


  .addMatcher(
    combineCases([
      AuthActions.retrieveSessionRequest,
      AuthActions.loginRequest,
      AuthActions.logoutRequest,
    ]),
    (state) => ({
      ...state,
      loadingState: LOADING_STATE.loading,
    }),
  )

  .addMatcher(
    combineCases([
      AuthActions.retrieveSessionSuccess,
      AuthActions.loginSuccess,
    ]),
    (state, { payload: { user } }) => ({
      ...state,
      loadingState: LOADING_STATE.loaded,
      isAuthed: true,
      error: null,
      user,
    }),
  )

  .addMatcher(
    combineCases([
      AuthActions.retrieveSessionFailure,
      AuthActions.loginFailure,
      AuthActions.logoutFailure,
    ]),
    (state, { payload: { error } }) => ({
      ...state,
      loadingState: LOADING_STATE.failed,
      error,
    }),
  ));
