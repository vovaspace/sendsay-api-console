import React, {
  useState,
  useCallback,
  useEffect,
} from 'react';

import { makeCn } from '@/utils';

import { PortalMountNodeContext } from '@/components/Portal';
import { AppHeader } from '@/containers/AppHeader';
import { RequestsHistoryList } from '@/containers/RequestsHistoryList';
import { InputOutput } from '@/containers/InputOutput';
import { AppFooter } from '@/containers/AppFooter';

import styles from './AppScreen.scss';


const cn = makeCn('AppScreen', styles);


export const AppScreen = () => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const [rootEl, setRootEl] = useState(null);


  const handleFullscreenToggle = useCallback(() => {
    // Open
    if (!document.fullscreenElement && !document.webkitFullscreenElement) {
      if (rootEl?.requestFullscreen) {
        rootEl.requestFullscreen();
      } else if (rootEl?.webkitRequestFullscreen) {
        rootEl.webkitRequestFullscreen();
      }

      return;
    }

    // Close
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    }
  }, [rootEl]);


  useEffect(() => {
    if (!rootEl) {
      return () => null;
    }

    const listener = () => {
      setIsFullscreen(Boolean(document.fullscreenElement || document.webkitFullscreenElement));
    };

    rootEl.addEventListener('fullscreenchange', listener);
    rootEl.addEventListener('webkitfullscreenchange', listener);

    return () => {
      rootEl.removeEventListener('fullscreenchange', listener);
      rootEl.removeEventListener('webkitfullscreenchange', listener);
    };
  }, [rootEl]);


  return (
    <div
      ref={setRootEl}
      className={cn()}
    >
      <PortalMountNodeContext.Provider value={rootEl}>
        <AppHeader
          fullscreen={isFullscreen}
          hideFullscreenButton={!(document.fullscreenEnabled || document.webkitFullscreenEnabled)}
          onFullscreenToggle={handleFullscreenToggle}
        />
        <RequestsHistoryList />
        <InputOutput className={cn('InputOutput')} />
        <AppFooter />
      </PortalMountNodeContext.Provider>
    </div>
  );
};
