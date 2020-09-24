import React from 'react';
import PropTypes from 'prop-types';

import { makeCn } from '@/utils';

import styles from './Notification.scss';


const cn = makeCn('Notification', styles);


export const Notification = (props) => {
  const {
    children,
    className,
  } = props;

  return (
    <span className={cn(null, [className])}>
      {children}
    </span>
  );
};


export const NotificationPropTypes = {
  children: PropTypes.string.isRequired,
  className: PropTypes.string,
};


export const NotificationDefaultProps = {
  className: null,
};


Notification.propTypes = NotificationPropTypes;
Notification.defaultProps = NotificationDefaultProps;
