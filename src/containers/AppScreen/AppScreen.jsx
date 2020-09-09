import React from 'react';

import { makeCn } from '@/utils';

import { AppHeader } from '@/containers/AppHeader';
import { RequestsHistoryList } from '@/containers/RequestsHistoryList';
import { InputOutput } from '@/containers/InputOutput';
import { AppFooter } from '@/containers/AppFooter';

import './AppScreen.scss';


const cn = makeCn('AppScreen');


export const AppScreen = () => (
  <div className={cn()}>
    <AppHeader />
    <RequestsHistoryList />
    <InputOutput className={cn('InputOutput')} />
    <AppFooter />
  </div>
);
