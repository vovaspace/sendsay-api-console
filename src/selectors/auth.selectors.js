import { createSimpleSelector } from '@/utils';


export const selectAuth = (state) => state.auth;


export const selectLoadingState = createSimpleSelector(
  selectAuth,
  (state) => state.loadingState,
);

export const selectIsAuthed = createSimpleSelector(
  selectAuth,
  (state) => state.isAuthed,
);

export const selectError = createSimpleSelector(
  selectAuth,
  (state) => state.error,
);

export const selectUser = createSimpleSelector(
  selectAuth,
  (state) => state.user,
);
