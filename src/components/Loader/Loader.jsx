import React from 'react';
import PropTypes from 'prop-types';

import { makeCn } from '@/utils';

import { Icon } from '@/components/Icon';

import styles from './Loader.scss';


const cn = makeCn('Loader', styles);


export const Loader = (props) => {
  const {
    className,
    color,
  } = props;

  return (
    <Icon
      className={cn({ color }, [className])}
      icon="loader"
    />
  );
};


export const LoaderPropTypes = {
  className: PropTypes.string,
  color: PropTypes.oneOf(['blue', 'light']),
};


export const LoaderDefaultProps = {
  className: null,
  color: 'blue',
};


Loader.propTypes = LoaderPropTypes;
Loader.defaultProps = LoaderDefaultProps;
