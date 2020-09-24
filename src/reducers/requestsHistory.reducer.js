import { createReducer } from '@reduxjs/toolkit';

import { REQUESTS_HISTORY } from '@/constants';
import { RequestsHistoryActions } from '@/actions';


const initialState = {
  items: [],
  notifications: [],
};


export const requestsHistory = createReducer(initialState, (builder) => builder
  .addCase(RequestsHistoryActions.setItems, (state, { payload: { items } }) => ({
    ...state,
    items,
  }))


  .addCase(RequestsHistoryActions.addItem, (state, {
    payload: {
      id,
      action,
      request,
      status,
    },
  }) => ({
    ...state,
    items: [
      // New item
      {
        id,
        action,
        request,
        status,
      },
      // Remove items with similar request
      ...state.items.filter(
        (item) => item.request !== request,
      ),
    ].slice(0, REQUESTS_HISTORY.volume), // No more than the volume
  }))

  .addCase(RequestsHistoryActions.removeItem, (state, { payload: { id } }) => ({
    ...state,
    items: state.items.filter((item) => item.id !== id),
  }))


  .addCase(RequestsHistoryActions.clear, (state) => ({
    ...state,
    items: initialState.items,
  }))


  .addCase(
    RequestsHistoryActions.addNotification,
    (state, { payload: { id, itemId, message } }) => ({
      ...state,
      notifications: [{ id, itemId, message }, ...state.notifications],
    }),
  )

  .addCase(RequestsHistoryActions.removeNotification, (state, { payload: { id } }) => ({
    ...state,
    notifications: state.notifications.filter((message) => message.id !== id),
  })));
