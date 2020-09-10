import { createAction } from '@reduxjs/toolkit';


export const initRequest = createAction('[INITIALIZATION] INIT--REQUEST');
export const initSuccess = createAction('[INITIALIZATION] INIT--SUCCESS');
export const initFailure = createAction('[INITIALIZATION] INIT--FAILURE');
