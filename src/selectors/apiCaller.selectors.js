import { CALL_STATUS, LOADING_STATE } from '@/constants';
import { createSimpleSelector } from '@/utils';


export const selectApiCaller = (state) => state.apiCaller;


export const selectLoadingState = createSimpleSelector(
  selectApiCaller,
  (state) => state.loadingState,
);

export const selectIsLoading = createSimpleSelector(
  selectLoadingState,
  (loadingState) => loadingState === LOADING_STATE.loading,
);


export const selectValue = createSimpleSelector(
  selectApiCaller,
  (state) => state.value,
);

export const selectRequestValue = createSimpleSelector(
  selectValue,
  (value) => value.request,
);

export const selectResponseValue = createSimpleSelector(
  selectValue,
  (value) => value.response,
);


export const selectStatus = createSimpleSelector(
  selectApiCaller,
  (state) => state.status,
);


export const selectRequestStatus = createSimpleSelector(
  selectStatus,
  (status) => status.request,
);

export const selectIsCallInvalid = createSimpleSelector(
  selectRequestStatus,
  (requestStatus) => requestStatus === CALL_STATUS.invalid,
);


export const selectResponseStatus = createSimpleSelector(
  selectStatus,
  (status) => status.response,
);

export const selectIsCallError = createSimpleSelector(
  selectResponseStatus,
  (responseStatus) => responseStatus === CALL_STATUS.error,
);
