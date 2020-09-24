import { createAction } from '@reduxjs/toolkit';

import { payloadWithId } from '@/utils';


export const setItems = createAction('[REQUESTS_HISTORY] ITEMS_SET');
export const addItem = createAction('[REQUESTS_HISTORY] ITEM_ADD', payloadWithId);
export const removeItem = createAction('[REQUESTS_HISTORY] ITEM_REMOVE');
export const clear = createAction('[REQUESTS_HISTORY] CLEAR');

export const addNotification = createAction('[REQUESTS_HISTORY] NOTIFICATION_ADD', payloadWithId);
export const removeNotification = createAction('[REQUESTS_HISTORY] NOTIFICATION_REMOVE');
