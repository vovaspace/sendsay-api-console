import { createAction } from '@reduxjs/toolkit';


export const setState = createAction('[USER_INTERFACE] STATE_SET');

export const shiftInputOutputFieldsRatio = createAction('[USER_INTERFACE] INPUT_OUTPUT_FIELDS_RATIO_SHIFT');
