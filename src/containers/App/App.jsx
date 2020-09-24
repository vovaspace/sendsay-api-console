import React, { useMemo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { LOADING_STATE } from '@/constants';
import { makeCn } from '@/utils';
import { InitActions } from '@/actions';
import { InitSelectors, AuthSelectors } from '@/selectors';

import { Loader } from '@/components/Loader';
import { AppScreen } from '@/containers/AppScreen';
import { AuthScreen } from '@/containers/AuthScreen';

import styles from './App.scss';


const cn = makeCn('App', styles);


export const App = () => {
  const dispatch = useDispatch();

  const loadingState = useSelector(InitSelectors.selectLoadingState);
  const isAuthed = useSelector(AuthSelectors.selectIsAuthed);


  // Initialization
  useEffect(() => {
    dispatch(InitActions.startInit());
  }, [dispatch]);


  const content = useMemo(() => {
    switch (loadingState) {
      case LOADING_STATE.loading: {
        return <Loader className={cn('CenteredContent')} />;
      }


      case LOADING_STATE.loaded: {
        return isAuthed ? <AppScreen /> : <AuthScreen />;
      }


      case LOADING_STATE.notAsked:
      default: {
        return null;
      }
    }
  }, [
    loadingState,
    isAuthed,
  ]);


  return (
    <div className={cn()}>
      {content}
    </div>
  );
};
