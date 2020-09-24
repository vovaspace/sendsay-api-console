import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import { makeCn } from '@/utils';
import { ApiCallerActions } from '@/actions';
import { ApiCallerSelectors } from '@/selectors';

import { AppBar } from '@/components/AppBar';
import { Button } from '@/components/Button';
import { Copyright } from '@/components/Copyright';
import { IconButton } from '@/components/IconButton';

import styles from './AppFooter.scss';


const cn = makeCn('AppFooter', styles);


export const AppFooter = (props) => {
  const {
    className,
  } = props;

  const dispatch = useDispatch();

  const isCallLoading = useSelector(ApiCallerSelectors.selectIsLoading);


  const handleSend = useCallback(() => {
    dispatch(ApiCallerActions.makeCallRequest());
  }, [dispatch]);

  const handleFormat = useCallback(() => {
    dispatch(ApiCallerActions.formatRequest());
  }, [dispatch]);


  return (
    <AppBar
      className={cn(null, [className])}
      tag="footer"
      type="bottom"
    >
      <span className={cn('Item', { aligned: 'left' })}>
        <Button
          loading={isCallLoading}
          disableOnLoading={false}
          onClick={handleSend}
        >
          Отправить
        </Button>
      </span>

      <span className={cn('Item', { aligned: 'center' })}>
        <Copyright />
      </span>

      <span className={cn('Item', { aligned: 'right' })}>
        <IconButton
          icon="align-right"
          onClick={handleFormat}
        >
          Форматировать
        </IconButton>
      </span>
    </AppBar>
  );
};


export const AppFooterPropTypes = {
  className: PropTypes.string,
};


export const AppFooterDefaultProps = {
  className: null,
};


AppFooter.propTypes = AppFooterPropTypes;
AppFooter.defaultProps = AppFooterDefaultProps;
