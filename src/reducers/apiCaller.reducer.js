import { createReducer } from '@reduxjs/toolkit';

import { LOADING_STATE, CALL_STATUS } from '@/constants';
import { stringifyCall } from '@/utils';
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

  .addCase(ApiCallerActions.makeCallSuccess, (state, { payload: { response, status } }) => ({
    ...state,
    loadingState: LOADING_STATE.loaded,
    status: { request: CALL_STATUS.success, response: status },
    value: { ...state.value, response: stringifyCall(response) },
  }))

  .addCase(ApiCallerActions.makeCallFailure, (state) => ({
    ...state,
    loadingState: LOADING_STATE.failed,
    status: { ...state.status, request: CALL_STATUS.invalid },
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
      const formatedRequest = stringifyCall(JSON.parse(request));

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
