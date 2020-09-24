import { createSimpleSelector } from '@/utils';


export const selectUserInterface = (state) => state.userInterface;


export const selectInputOutputFieldsRatio = createSimpleSelector(
  selectUserInterface,
  (state) => state.inputOutputFieldsRatio,
);
