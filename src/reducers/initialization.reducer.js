import { createReducer } from '@reduxjs/toolkit';

import { InitializationActions } from '@/actions';


const initialState = {
  hasInitialized: false,
  isFetching: false,
  error: null,
};


export const initialization = createReducer(initialState, (builder) => builder
  .addCase(InitializationActions.initRequest, (state) => ({
    ...state,
    isFetching: true,
    error: null,
  }))

  .addCase(InitializationActions.initSuccess, (state) => ({
    ...state,
    hasInitialized: true,
    isFetching: false,
  }))

  .addCase(InitializationActions.initFailure, (state, { payload: { error } }) => ({
    ...state,
    isFetching: false,
    error,
  })));
