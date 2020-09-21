import React, { forwardRef, useMemo } from 'react';
import PropTypes from 'prop-types';

import { ChildrenOfTypePropType } from '@/utils';

import { cn } from './cn';
import { MenuListContext } from './context';

import { MenuListItem } from './MenuListItem';
import { MenuListDivider } from './MenuListDivider';

import './MenuList.scss';


// eslint-disable-next-line prefer-arrow-callback
export const MenuList = forwardRef(function MenuList(props, ref) {
  const {
    children,
    className,

    onAnyItemClick,

    ...rest
  } = props;


  const contextValue = useMemo(() => ({
    onAnyItemClick,
  }), [onAnyItemClick]);


  return (
    <ul
      ref={ref}
      className={cn(null, [className])}
      role="menu"
      {...rest}
    >
      <MenuListContext.Provider value={contextValue}>
        {children}
      </MenuListContext.Provider>
    </ul>
  );
});


export const MenuListPropTypes = {
  children: ChildrenOfTypePropType([
    MenuListItem,
    MenuListDivider,
  ]).isRequired,
  className: PropTypes.string,

  onAnyItemClick: PropTypes.func,
};


export const MenuListDefaultProps = {
  className: null,

  onAnyItemClick: null,
};


MenuList.propTypes = MenuListPropTypes;
MenuList.defaultProps = MenuListDefaultProps;
