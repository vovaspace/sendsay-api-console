import React, { useContext, useCallback } from 'react';
import PropTypes from 'prop-types';

import { cn } from './cn';
import { MenuListContext } from './context';


export const MenuListItem = (props) => {
  const {
    children,
    className,
    destructive,

    onClick,
  } = props;


  const { onAnyItemClick } = useContext(MenuListContext);

  const handleClick = useCallback(() => {
    onClick();
    onAnyItemClick?.();
  }, [onClick, onAnyItemClick]);


  return (
    <li
      className={cn('Item', [className])}
      role="menuitem"
    >
      <button
        className={cn('Button', { destructive })}
        type="button"
        onClick={handleClick}
      >
        {children}
      </button>
    </li>
  );
};


export const MenuListItemPropTypes = {
  children: PropTypes.string.isRequired,
  className: PropTypes.string,
  destructive: PropTypes.bool,

  onClick: PropTypes.func.isRequired,
};


export const MenuListItemDefaultProps = {
  className: null,
  destructive: false,
};


MenuListItem.propTypes = MenuListItemPropTypes;
MenuListItem.defaultProps = MenuListItemDefaultProps;
