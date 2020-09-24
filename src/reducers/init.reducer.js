import { createReducer } from '@reduxjs/toolkit';

import { LOADING_STATE } from '@/constants';
import { InitActions } from '@/actions';


const initialState = {
  loadingState: LOADING_STATE.notAsked,
};


export const init = createReducer(initialState, (builder) => builder
  .addCase(InitActions.startInit, (state) => ({
    ...state,
    loadingState: LOADING_STATE.loading,
  }))

  .addCase(InitActions.doneInit, (state) => ({
    ...state,
    loadingState: LOADING_STATE.loaded,
  })));
