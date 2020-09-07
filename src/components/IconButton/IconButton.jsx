import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import { makeCn } from '@/utils';

import { Icon, IconPropTypes } from '@/components/Icon';

import './IconButton.scss';


const ICON_POSITION = {
  left: 'left',
  right: 'right',
};


const cn = makeCn('IconButton');


export const IconButton = (props) => {
  const {
    children,
    className,
    type,
    hiddenLabel,
    iconPosition,
    icon,
    ...rest
  } = props;

  const isRightIconPosition = iconPosition === ICON_POSITION.right;

  return (
    <button
      className={classnames(cn(), className)}
      // eslint-disable-next-line react/button-has-type
      type={type}
      title={hiddenLabel ? children : null}
      {...rest}
    >
      <span className={cn('Inner', { invertedDirection: isRightIconPosition })}>
        <Icon className={cn('Icon')} icon={icon} />
        <span
          className={cn('Label', {
            withRightMargin: isRightIconPosition,
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
  hiddenLabel: PropTypes.bool,
  iconPosition: PropTypes.oneOf(Object.values(ICON_POSITION)),

  // eslint-disable-next-line react/require-default-props
  icon: IconPropTypes.icon,
};


export const IconButtonDefaultProps = {
  className: null,
  type: 'button',
  hiddenLabel: false,
  iconPosition: ICON_POSITION.left,
};


IconButton.propTypes = IconButtonPropTypes;
IconButton.defaultProps = IconButtonDefaultProps;
