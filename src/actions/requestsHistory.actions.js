import { createAction, nanoid } from '@reduxjs/toolkit';


export const setFromLocalStorageRequest = createAction('[REQUESTS_HISTORY] FROM_LOCAL_STORAGE_SET--REQUEST');
export const setFromLocalStorageSuccess = createAction('[REQUESTS_HISTORY] FROM_LOCAL_STORAGE_SET--SUCCESS');
export const setFromLocalStorageFailure = createAction('[REQUESTS_HISTORY] FROM_LOCAL_STORAGE_SET--FAILURE');

export const addItem = createAction('[REQUESTS_HISTORY] ITEM_ADD', (payload) => ({
  payload: { ...payload, id: nanoid() },
}));

export const clear = createAction('[REQUESTS_HISTORY] CLEAR');
