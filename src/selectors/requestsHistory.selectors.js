import { createSimpleSelector } from '@/utils';


export const selectRequestsHistory = (state) => state.requestsHistory;


export const selectItems = createSimpleSelector(
  selectRequestsHistory,
  (state) => state.items,
);
