import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { InitializationActions } from '@/actions';
import { InitializationSelectors } from '@/selectors';

// import { AppScreen } from '@/containers/AppScreen';
import { AuthScreen } from '@/containers/AuthScreen';


export const App = () => {
  const dispatch = useDispatch();

  const hasInitialized = useSelector(InitializationSelectors.selectHasInitialized);

  useEffect(() => {
    dispatch(InitializationActions.initRequest());
  }, [dispatch]);

  if (!hasInitialized) {
    return <span>Loading...</span>;
  }

  return (
    <AuthScreen />
  );
};
