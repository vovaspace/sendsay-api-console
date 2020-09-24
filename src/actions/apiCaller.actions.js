import { createAction } from '@reduxjs/toolkit';


export const makeCallRequest = createAction('[API_CALLER] CALL_MAKE--REQUEST');
export const makeCallSuccess = createAction('[API_CALLER] CALL_MAKE--SUCCESS');
export const makeCallFailure = createAction('[API_CALLER] CALL_MAKE--FAILURE');

export const setRequestValue = createAction('[API_CALLER] REQUEST_VALUE_SET');

export const formatRequest = createAction('[API_CALLER] REQUEST_FORMAT');
