import React from 'react';
import PropTypes from 'prop-types';

import { makeCn } from '@/utils';

import { Icon, IconPropTypes } from '@/components/Icon';
import { Loader } from '@/components/Loader';

import styles from './IconButton.scss';


const ICON_POSITION = {
  left: 'left',
  right: 'right',
};


const cn = makeCn('IconButton', styles);


export const IconButton = (props) => {
  const {
    children,
    className,
    type,
    disabled,
    loading,
    disableOnLoading,
    hiddenLabel,
    iconPosition,
    icon,
    ...rest
  } = props;


  return (
    <button
      className={cn({ disabled }, [className])}
      // eslint-disable-next-line react/button-has-type
      type={type}
      title={hiddenLabel ? children : null}
      disabled={disabled || (loading && disableOnLoading)}
      {...rest}
    >
      <span
        className={cn('Inner', {
          invertedDirection: iconPosition === ICON_POSITION.right,
        })}
      >
        {(loading
          ? <Loader />
          : <Icon icon={icon} />
        )}

        <span
          className={cn('Label', {
            margin: iconPosition,
            hidden: hiddenLabel,
          })}
        >
          {children}
        </span>
      </span>
    </button>
  );
};


export const IconButtonPropTypes = {
  children: PropTypes.string.isRequired,
  className: PropTypes.string,
  type: PropTypes.oneOf(['button', 'reset', 'submit']),
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  disableOnLoading: PropTypes.bool,
  hiddenLabel: PropTypes.bool,
  iconPosition: PropTypes.oneOf(Object.values(ICON_POSITION)),

  // eslint-disable-next-line react/require-default-props
  icon: IconPropTypes.icon,
};


export const IconButtonDefaultProps = {
  className: null,
  type: 'button',
  disabled: false,
  loading: false,
  disableOnLoading: true,
  hiddenLabel: false,
  iconPosition: ICON_POSITION.left,
};


IconButton.propTypes = IconButtonPropTypes;
IconButton.defaultProps = IconButtonDefaultProps;
