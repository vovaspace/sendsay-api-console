import { createReducer } from '@reduxjs/toolkit';

import { UserInterfaceActions } from '@/actions';


const initialState = {
  inputOutputFieldsRatio: 50,
};


export const userInterface = createReducer(initialState, (builder) => builder
  .addCase(UserInterfaceActions.setState, (state, { payload }) => ({
    ...state,
    ...payload,
  }))

  .addCase(UserInterfaceActions.shiftInputOutputFieldsRatio, (state, { payload: { size } }) => ({
    ...state,
    inputOutputFieldsRatio: state.inputOutputFieldsRatio + size,
  })));
