import { createSelector } from '@reduxjs/toolkit';

import { LOADING_STATE } from '@/constants';
import { createSimpleSelector } from '@/utils';


export const selectAuth = (state) => state.auth;


export const selectLoadingState = createSimpleSelector(
  selectAuth,
  (state) => state.loadingState,
);

export const selectIsLoading = createSimpleSelector(
  selectLoadingState,
  (loadingState) => loadingState === LOADING_STATE.loading,
);


export const selectIsAuthed = createSimpleSelector(
  selectAuth,
  (state) => state.isAuthed,
);


export const selectError = createSimpleSelector(
  selectAuth,
  (state) => state.error,
);

export const selectErrorWithoutRequest = createSelector(
  selectError,
  (error) => {
    if (!error) {
      return null;
    }

    const { request, ...rest } = error;
    return rest;
  },
);


export const selectUser = createSimpleSelector(
  selectAuth,
  (state) => state.user,
);
