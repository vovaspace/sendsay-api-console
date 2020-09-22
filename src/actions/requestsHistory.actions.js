import { createAction, nanoid } from '@reduxjs/toolkit';


export const setItems = createAction('[REQUESTS_HISTORY] ITEMS_SET');

export const addItem = createAction('[REQUESTS_HISTORY] ITEM_ADD', (payload) => ({
  payload: { ...payload, id: nanoid() },
}));

export const removeItem = createAction('[REQUESTS_HISTORY] ITEM_REMOVE');

export const clear = createAction('[REQUESTS_HISTORY] CLEAR');
