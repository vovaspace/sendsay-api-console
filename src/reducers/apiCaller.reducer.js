import { createReducer } from '@reduxjs/toolkit';

import { LOADING_STATE, CALL_STATUS, TAB_SIZE } from '@/constants';
import { ApiCallerActions } from '@/actions';


const initialState = {
  loadingState: LOADING_STATE.notAsked,
  callStatus: null,
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
    callStatus: CALL_STATUS.success,
    value: { ...state.value, response: JSON.stringify(response, null, TAB_SIZE) },
  }))

  .addCase(ApiCallerActions.makeCallFailure, (state, { payload: { response, status } }) => ({
    ...state,
    loadingState: LOADING_STATE.failed,
    callStatus: status,
    value: { ...state.value, response: response ? JSON.stringify(response, null, TAB_SIZE) : '' },
  }))


  .addCase(ApiCallerActions.setRequestValue, (state, { payload: { value } }) => ({
    ...state,
    value: { ...state.value, request: value },
  }))


  .addCase(ApiCallerActions.formatRequest, (state) => {
    const { value } = state;
    const { request } = value;

    try {
      const formatedRequest = JSON.stringify(JSON.parse(request), null, TAB_SIZE);

      return {
        ...state,
        callStatus: null,
        value: { ...value, request: formatedRequest },
      };
    } catch (error) {
      return { ...state, callStatus: CALL_STATUS.invalid };
    }
  }));
