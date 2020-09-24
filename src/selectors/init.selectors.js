import { createSimpleSelector } from '@/utils';


export const selectInit = (state) => state.init;


export const selectLoadingState = createSimpleSelector(
  selectInit,
  (state) => state.loadingState,
);
