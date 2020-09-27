import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import { makeCn } from '@/utils';
import { AuthActions } from '@/actions';
import { AuthSelectors } from '@/selectors';

import { AppBar } from '@/components/AppBar';
import { IconButton } from '@/components/IconButton';
import { Logotype } from '@/components/Logotype';
import { TextLogotype } from '@/components/TextLogotype';
import { UserChip } from '@/components/UserChip';

import styles from './AppHeader.scss';


const cn = makeCn('AppHeader', styles);


export const AppHeader = (props) => {
  const {
    className,
    fullscreen,
    hideFullscreenButton,
    onFullscreenToggle,
  } = props;

  const dispatch = useDispatch();

  const user = useSelector(AuthSelectors.selectUser);
  const isLogoutLoading = useSelector(AuthSelectors.selectIsLoading);


  const handleLogout = useCallback(() => {
    dispatch(AuthActions.logoutRequest());
  }, [dispatch]);


  return (
    <AppBar
      className={cn(null, [className])}
      tag="header"
      type="top"
    >
      <span className={cn('Item', { shiftingRight: true })}>
        <Logotype className={cn('Item')} />
        <TextLogotype
          className={cn('Item', { textLogotype: true, hiddenOnLaptopDown: true })}
          shrinked
        />
      </span>

      <UserChip
        className={cn('Item', { hiddenOnLaptopDown: true })}
        account={user.account}
        sublogin={user.sublogin}
      />

      <IconButton
        className={cn('Item')}
        icon="logout"
        iconPosition="right"
        loading={isLogoutLoading}

        onClick={handleLogout}
      >
        Выйти
      </IconButton>

      {!hideFullscreenButton && (
        <IconButton
          className={cn('Item')}
          icon={fullscreen ? 'minimize' : 'maximize'}
          hiddenLabel

          onClick={onFullscreenToggle}
        >
          {fullscreen ? 'Выйти из полноэкранного режима' : 'Перейти в полноэкранный режим'}
        </IconButton>
      )}
    </AppBar>
  );
};


export const AppHeaderPropTypes = {
  className: PropTypes.string,
  fullscreen: PropTypes.bool.isRequired,
  hideFullscreenButton: PropTypes.bool.isRequired,
  onFullscreenToggle: PropTypes.func.isRequired,
};


export const AppHeaderDefaultProps = {
  className: null,
};


AppHeader.propTypes = AppHeaderPropTypes;
AppHeader.defaultProps = AppHeaderDefaultProps;
