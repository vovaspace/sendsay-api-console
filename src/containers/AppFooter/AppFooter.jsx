import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import { makeCn } from '@/utils';

import { AppBar } from '@/components/AppBar';
import { Button } from '@/components/Button';
import { IconButton } from '@/components/IconButton';

import './AppFooter.scss';


const cn = makeCn('AppFooter');


export const AppFooter = (props) => {
  const {
    className,
  } = props;


  return (
    <AppBar
      className={classnames(cn(), className)}
      tag="footer"
      type="bottom"
    >
      <Button>
        Отправить
      </Button>

      <IconButton
        icon="align-right"
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
