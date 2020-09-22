/* eslint-disable jsx-a11y/no-static-element-interactions */

import React, {
  useState,
  useCallback,
  useRef,
  useEffect,
} from 'react';
import PropTypes from 'prop-types';

import { KEYBOARD_KEY } from '@/constants';
import { makeCn } from '@/utils';

import { Icon } from '@/components/Icon';
import { Popper, PopperPropTypes } from '@/components/Popper';
import { MenuList, MenuListPropTypes } from '@/components/MenuList';

import styles from './ButtonMenu.scss';


const cn = makeCn('ButtonMenu', styles);


export const ButtonMenu = (props) => {
  const {
    children,
    htmlId,
    className,
    popperClassName,
    referenceEl,
    label,
    closeOnItemClick,
  } = props;


  const hasMounted = useRef(false);
  const menuListRef = useRef(null);
  const buttonRef = useRef(null);

  const [isOpen, setIsOpen] = useState(false);


  const handleToggle = useCallback(() => {
    setIsOpen((state) => !state);
  }, []);

  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, []);


  const handleMenuListBlur = useCallback((event) => {
    if (
      // Handle blur away
      !event.currentTarget.contains(event.relatedTarget)
      // Handle not toggle-button focus
      && event.relatedTarget !== buttonRef.current
    ) {
      handleClose();
    }
  }, [handleClose]);


  const handleMenuListKeyDown = useCallback((event) => {
    if (event.key === KEYBOARD_KEY.escape) {
      handleClose();
    }
  }, [handleClose]);


  // Open/close effect
  useEffect(() => {
    // Skip on first render
    if (!hasMounted.current) {
      hasMounted.current = true;
      return;
    }

    if (isOpen) {
      menuListRef.current?.focus();
    } else {
      buttonRef.current?.focus();
    }
  }, [isOpen]);


  return (
    <>
      {/* -- Button -- */}
      <button
        ref={buttonRef}
        className={cn({ active: isOpen }, [className])}
        type="button"

        aria-controls={htmlId}
        aria-haspopup

        onClick={handleToggle}
      >
        <span className={cn('Label')}>{label}</span>
        <span className={cn('ButtonInner')}>
          <Icon icon="kebab-vertical" />
        </span>
      </button>


      {/* -- Popper -- */}
      {isOpen && (
        <Popper
          className={cn('Popper', [popperClassName])}
          referenceEl={referenceEl || buttonRef.current}
          placement="bottom-end"
        >
          {/* Need to fix a tab-navigation */}
          {/* eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex */}
          <span tabIndex={0} />

          <MenuList
            ref={menuListRef}
            id={htmlId}
            className={cn('MenuList')}
            tabIndex={-1}

            onAnyItemClick={closeOnItemClick ? handleClose : null}
            onBlur={handleMenuListBlur}
            onKeyDown={handleMenuListKeyDown}
          >
            {children}
          </MenuList>

          {/* Need to fix a tab-navigation */}
          {/* eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex */}
          <span tabIndex={0} />
        </Popper>
      )}
    </>
  );
};


export const ButtonMenuPropTypes = {
  className: PropTypes.string,
  popperClassName: PropTypes.string,
  htmlId: PropTypes.string.isRequired,
  label: PropTypes.string,
  closeOnItemClick: PropTypes.bool,

  /* eslint-disable react/require-default-props */
  children: MenuListPropTypes.children,

  referenceEl: PopperPropTypes.referenceEl,
  /* eslint-enable react/require-default-props */
};


export const ButtonMenuDefaultProps = {
  className: null,
  popperClassName: null,
  label: 'Открыть/закрыть меню',
  closeOnItemClick: true,
};


ButtonMenu.propTypes = ButtonMenuPropTypes;
ButtonMenu.defaultProps = ButtonMenuDefaultProps;
