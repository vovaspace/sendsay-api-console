import React from 'react';
import PropTypes from 'prop-types';

import { cn } from './cn';


export const MenuListDivider = (props) => {
  const {
    className,
  } = props;

  return (
    <li className={cn('Divider', [className])} />
  );
};


export const MenuListDividerPropTypes = {
  className: PropTypes.string,
};


export const MenuListDividerDefaultProps = {
  className: null,
};


MenuListDivider.propTypes = MenuListDividerPropTypes;
MenuListDivider.defaultProps = MenuListDividerDefaultProps;
