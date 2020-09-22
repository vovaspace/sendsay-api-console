import React from 'react';

import { makeCn } from '@/utils';

import { Logotype } from '@/components/Logotype';
import { Copyright } from '@/components/Copyright';
import { AuthForm } from '@/containers/AuthForm';

import styles from './AuthScreen.scss';


const cn = makeCn('AuthScreen', styles);


export const AuthScreen = () => (
  <div className={cn()}>
    <header className={cn('Header')}>
      <Logotype />
    </header>

    <AuthForm className={cn('Form')} />

    <footer className={cn('Footer')}>
      <Copyright />
    </footer>
  </div>
);
