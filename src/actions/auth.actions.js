import { createAction } from '@reduxjs/toolkit';


export const retrieveSessionRequest = createAction('[AUTH] SESSION_RETRIEVE--REQUEST');
export const retrieveSessionSuccess = createAction('[AUTH] SESSION_RETRIEVE--SUCCESS');
export const retrieveSessionFailure = createAction('[AUTH] SESSION_RETRIEVE--FAILURE');

export const loginRequest = createAction('[AUTH] LOGIN--REQUEST');
export const loginSuccess = createAction('[AUTH] LOGIN--SUCCESS');
export const loginFailure = createAction('[AUTH] LOGIN--FAILURE');

export const logoutRequest = createAction('[AUTH] LOGOUT--REQUEST');
export const logoutSuccess = createAction('[AUTH] LOGOUT--SUCCESS');
export const logoutFailure = createAction('[AUTH] LOGOUT--FAILURE');
