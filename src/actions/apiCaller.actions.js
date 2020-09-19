import { createAction } from '@reduxjs/toolkit';


export const makeCallRequest = createAction('[API_CALLER] CALL_MAKE--REQUEST');
export const makeCallSuccess = createAction('[API_CALLER] CALL_MAKE--SUCCESS');
export const makeCallFailureInvalid = createAction('[API_CALLER] CALL_MAKE--FAILURE_INVALID');
export const makeCallFailureError = createAction('[API_CALLER] CALL_MAKE--FAILURE_ERROR');

export const setRequestValue = createAction('[API_CALLER] REQUEST_VALUE_SET');

export const formatRequest = createAction('[API_CALLER] REQUEST_FORMAT');
