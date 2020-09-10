import { createSimpleSelector } from '@/utils';


export const selectInitialization = (state) => state.initialization;


export const selectHasInitialized = createSimpleSelector(
  selectInitialization,
  (state) => state.hasInitialized,
);

export const selectIsFetching = createSimpleSelector(
  selectInitialization,
  (state) => state.isFetching,
);

export const selectError = createSimpleSelector(
  selectInitialization,
  (state) => state.error,
);
