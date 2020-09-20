import { createReducer } from '@reduxjs/toolkit';
import equal from 'fast-deep-equal';

import { REQUESTS_HISTORY } from '@/constants';
import { RequestsHistoryActions } from '@/actions';


const initialState = {
  items: [],
};


export const requestsHistory = createReducer(initialState, (builder) => builder
  .addCase(RequestsHistoryActions.setFromLocalStorageSuccess, (state, { payload: { items } }) => ({
    ...state,
    items,
  }))


  .addCase(RequestsHistoryActions.addItem, (state, { payload: { id, request, status } }) => ({
    ...state,
    items: [
      { id, request, status }, // New item
      ...state.items.filter(
        (item) => !equal(item.request, request), // Remove items with similar request
      ),
    ].slice(0, REQUESTS_HISTORY.volume), // No more than the volume
  }))


  .addCase(RequestsHistoryActions.clear, (state) => ({
    ...state,
    items: initialState.items,
  })));
