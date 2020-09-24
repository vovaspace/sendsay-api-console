import React from 'react';
import PropTypes from 'prop-types';

import { makeCn } from '@/utils';

import styles from './UserChip.scss';


const cn = makeCn('UserChip', styles);


export const UserChip = (props) => {
  const {
    className,
    account,
    sublogin,
  } = props;


  return (
    <span className={cn(null, [className])}>
      <span className={cn('Item')}>{account}</span>
      {sublogin && <span className={cn('Item')}>{sublogin}</span>}
    </span>
  );
};


export const UserChipPropTypes = {
  className: PropTypes.string,
  account: PropTypes.string.isRequired,
  sublogin: PropTypes.string,
};


export const UserChipDefaultProps = {
  className: null,
  sublogin: null,
};


UserChip.propTypes = UserChipPropTypes;
UserChip.defaultProps = UserChipDefaultProps;
