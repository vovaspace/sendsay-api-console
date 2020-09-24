import React from 'react';
import PropTypes from 'prop-types';

import { makeCn } from '@/utils';

import logotypeSrc from './img/logotype.svg';
import styles from './Logotype.scss';


const cn = makeCn('Logotype', styles);


export const Logotype = (props) => {
  const {
    className,
  } = props;

  return (
    <img
      className={cn(null, [className])}
      src={logotypeSrc}
      alt="Логотип API-консольки"
    />
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
