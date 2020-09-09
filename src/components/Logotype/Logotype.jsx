import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import { makeCn } from '@/utils';

import './Logotype.scss';


const cn = makeCn('Logotype');


export const Logotype = (props) => {
  const {
    className,
  } = props;

  return (
    <div className={classnames(cn(), className)} />
  );
};


export const LogotypePropTypes = {
  className: PropTypes.string,
};


export const LogotypeDefaultProps = {
  className: null,
};


Logotype.propTypes = LogotypePropTypes;
Logotype.defaultProps = LogotypeDefaultProps;
