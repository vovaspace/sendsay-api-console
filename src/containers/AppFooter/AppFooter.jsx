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

import './AppFooter.scss';


const cn = makeCn('AppFooter');


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
      <Button
        loading={isCallLoading}
        disableOnLoading={false}
        onClick={handleSend}
      >
        Отправить
      </Button>

      <Copyright />

      <IconButton
        icon="align-right"
        onClick={handleFormat}
      >
        Форматировать
      </IconButton>
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
