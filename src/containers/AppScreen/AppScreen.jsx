import React, {
  useState,
  useCallback,
  useEffect,
  useRef,
} from 'react';

import { makeCn } from '@/utils';

import { AppHeader } from '@/containers/AppHeader';
import { RequestsHistoryList } from '@/containers/RequestsHistoryList';
import { InputOutput } from '@/containers/InputOutput';
import { AppFooter } from '@/containers/AppFooter';

import styles from './AppScreen.scss';


const cn = makeCn('AppScreen', styles);


export const AppScreen = () => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const rootRef = useRef(null);


  const handleFullscreenToggle = useCallback(() => {
    // Open
    if (!document.fullscreenElement && !document.webkitFullscreenElement) {
      if (rootRef.current?.requestFullscreen) {
        rootRef.current?.requestFullscreen();
      } else if (rootRef.current.webkitRequestFullscreen) {
        rootRef.current.webkitRequestFullscreen();
      }
    // Close
    } else if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    }
  }, []);


  useEffect(() => {
    const listener = () => {
      setIsFullscreen(Boolean(document.fullscreenElement || document.webkitFullscreenElement));
    };

    const rootEl = rootRef.current;
    rootEl.addEventListener('fullscreenchange', listener);
    rootEl.addEventListener('webkitfullscreenchange', listener);

    return () => {
      rootEl.removeEventListener('fullscreenchange', listener);
      rootEl.removeEventListener('webkitfullscreenchange', listener);
    };
  }, []);


  return (
    <div
      ref={rootRef}
      className={cn()}
    >
      <AppHeader
        fullscreen={isFullscreen}
        disabledFullscreenButton={
          !document.fullscreenEnabled
          && !document.webkitFullscreenEnabled
        }

        onFullscreenToggle={handleFullscreenToggle}
      />
      <RequestsHistoryList />
      <InputOutput className={cn('InputOutput')} />
      <AppFooter />
    </div>
  );
};
