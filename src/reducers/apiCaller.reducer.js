import { createReducer } from '@reduxjs/toolkit';

import { LOADING_STATE, CALL_STATUS, TAB_SIZE } from '@/constants';
import { ApiCallerActions } from '@/actions';


const initialState = {
  loadingState: LOADING_STATE.notAsked,
  status: { request: null, response: null },
  value: { request: '', response: '' },
};


export const apiCaller = createReducer(initialState, (builder) => builder
  .addCase(ApiCallerActions.makeCallRequest, (state) => ({
    ...state,
    loadingState: LOADING_STATE.loading,
  }))

  .addCase(ApiCallerActions.makeCallSuccess, (state, { payload: { response } }) => ({
    ...state,
    loadingState: LOADING_STATE.loaded,
    status: { request: CALL_STATUS.success, response: CALL_STATUS.success },
    value: { ...state.value, response: JSON.stringify(response, null, TAB_SIZE) },
  }))

  .addCase(ApiCallerActions.makeCallFailureInvalid, (state) => ({
    ...state,
    loadingState: LOADING_STATE.failed,
    status: { ...state.status, request: CALL_STATUS.invalid },
  }))

  .addCase(ApiCallerActions.makeCallFailureError, (state, { payload: { response } }) => ({
    ...state,
    loadingState: LOADING_STATE.failed,
    status: { ...state.status, response: CALL_STATUS.error },
    value: { ...state.value, response: JSON.stringify(response, null, TAB_SIZE) },
  }))


  .addCase(ApiCallerActions.setRequestValue, (state, { payload: { value } }) => ({
    ...state,
    status: { ...state.status, request: null },
    value: { ...state.value, request: value },
  }))


  .addCase(ApiCallerActions.formatRequest, (state) => {
    const { value, status } = state;
    const { request } = value;

    try {
      const formatedRequest = JSON.stringify(JSON.parse(request), null, TAB_SIZE);

      return {
        ...state,
        value: { ...value, request: formatedRequest },
      };
    } catch (error) {
      return {
        ...state,
        status: { ...status, request: CALL_STATUS.invalid },
      };
    }
  }));
