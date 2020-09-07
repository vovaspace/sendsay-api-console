import React from 'react';

import { makeCn } from '@/utils';

import { AppHeader } from '@/containers/AppHeader';
import { RequestsHistoryList } from '@/containers/RequestsHistoryList';
import { AppFooter } from '@/containers/AppFooter';

import './AppScreen.scss';


const cn = makeCn('AppScreen');


export const AppScreen = () => (
  <main className={cn()}>
    <AppHeader />
    <RequestsHistoryList />
    <div style={{ flexGrow: 1 }} />
    <AppFooter />
  </main>
);
