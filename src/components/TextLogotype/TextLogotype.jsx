import React from 'react';
import PropTypes from 'prop-types';

import { makeCn } from '@/utils';

import styles from './TextLogotype.scss';


const cn = makeCn('TextLogotype', styles);


export const TextLogotype = (props) => {
  const {
    className,
    shrinked,
  } = props;

  return (
    <h1 className={cn({ shrinked }, [className])}>
      API-консолька
    </h1>
  );
};


export const TextLogotypePropTypes = {
  className: PropTypes.string,
  shrinked: PropTypes.bool,
};


export const TextLogotypeDefaultProps = {
  className: null,
  shrinked: false,
};


TextLogotype.propTypes = TextLogotypePropTypes;
TextLogotype.defaultProps = TextLogotypeDefaultProps;
