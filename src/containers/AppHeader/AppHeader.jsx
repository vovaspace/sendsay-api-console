import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import { makeCn } from '@/utils';

import { AppBar } from '@/components/AppBar';
import { IconButton } from '@/components/IconButton';
import { Logotype } from '@/components/Logotype';
import { UserChip } from '@/components/UserChip';

import './AppHeader.scss';


const cn = makeCn('AppHeader');


export const AppHeader = (props) => {
  const {
    className,
  } = props;


  return (
    <AppBar
      className={classnames(cn(), className)}
      tag="header"
      type="top"
    >
      <Logotype className={cn('Item')} />
      <UserChip className={cn('Item', { shiftedRight: true })} login="some@email.com" sublogin="sublogin" />
      <IconButton
        className={cn('Item')}
        icon="logout"
        iconPosition="right"
      >
        Выйти
      </IconButton>
    </AppBar>
  );
};


export const AppHeaderPropTypes = {
  className: PropTypes.string,
};


export const AppHeaderDefaultProps = {
  className: null,
};


AppHeader.propTypes = AppHeaderPropTypes;
AppHeader.defaultProps = AppHeaderDefaultProps;
