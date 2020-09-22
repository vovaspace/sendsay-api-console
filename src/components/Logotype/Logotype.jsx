import React from 'react';
import PropTypes from 'prop-types';

import { makeCn } from '@/utils';

import styles from './Logotype.scss';


const cn = makeCn('Logotype', styles);


export const Logotype = (props) => {
  const {
    className,
  } = props;

  return (
    <div className={cn(null, [className])} />
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
