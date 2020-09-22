import React from 'react';
import PropTypes from 'prop-types';

import { makeCn } from '@/utils';

import styles from './Icon.scss';


// Icons are stored in src/resources/icons

// Load resources
const iconFiels = require.context('../../resources/icons', true, /.*\.svg$/);
iconFiels.keys().forEach(iconFiels);


const cn = makeCn('Icon', styles);


export const Icon = (props) => {
  const {
    className,
    icon,
  } = props;

  return (
    <svg className={cn(null, [className])}>
      <use xlinkHref={`#icon-${icon}`} />
    </svg>
  );
};


export const IconPropTypes = {
  className: PropTypes.string,

  // Icon names from src/resources/icons
  icon: PropTypes.oneOf([
    'align-right',
    'cancel',
    'kebab-vertical',
    'loader',
    'logout',
    'maximize',
    'meh',
    'minimize',
  ]).isRequired,
};


export const IconDefaultProps = {
  className: null,
};


Icon.propTypes = IconPropTypes;
Icon.defaultProps = IconDefaultProps;
