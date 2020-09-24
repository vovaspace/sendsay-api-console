import { createSimpleSelector } from '@/utils';


export const selectRequestsHistory = (state) => state.requestsHistory;


export const selectItems = createSimpleSelector(
  selectRequestsHistory,
  (state) => state.items,
);

export const selectNotifications = createSimpleSelector(
  selectRequestsHistory,
  (state) => state.notifications,
);
