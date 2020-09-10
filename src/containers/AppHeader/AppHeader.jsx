import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import { makeCn } from '@/utils';
import { AuthActions } from '@/actions';
import { AuthSelectors } from '@/selectors';

import { AppBar } from '@/components/AppBar';
import { IconButton } from '@/components/IconButton';
import { Logotype } from '@/components/Logotype';
import { TextLogotype } from '@/components/TextLogotype';
import { UserChip } from '@/components/UserChip';

import './AppHeader.scss';


const cn = makeCn('AppHeader');


export const AppHeader = (props) => {
  const {
    className,
  } = props;

  const dispatch = useDispatch();

  const user = useSelector(AuthSelectors.selectUser);


  const handleLogout = useCallback(() => {
    dispatch(AuthActions.logoutRequest());
  }, [dispatch]);


  return (
    <AppBar
      className={classnames(cn(), className)}
      tag="header"
      type="top"
    >
      <Logotype className={cn('Item', { logotype: true })} />
      <TextLogotype className={cn('Item')} shrinked />

      <UserChip
        className={cn('Item', { shiftedRight: true })}
        account={user.account}
        sublogin={user.sublogin}
      />

      <IconButton
        className={cn('Item')}
        icon="logout"
        iconPosition="right"

        onClick={handleLogout}
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
