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


export const selectCallStatus = createSimpleSelector(
  selectApiCaller,
  (state) => state.callStatus,
);

export const selectIsCallError = createSimpleSelector(
  selectCallStatus,
  (callStatus) => callStatus === CALL_STATUS.error,
);

export const selectIsCallInvalid = createSimpleSelector(
  selectCallStatus,
  (callStatus) => callStatus === CALL_STATUS.invalid,
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
