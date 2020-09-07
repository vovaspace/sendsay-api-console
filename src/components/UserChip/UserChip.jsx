import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import { makeCn } from '@/utils';

import './UserChip.scss';


const cn = makeCn('UserChip');


export const UserChip = (props) => {
  const {
    className,
    login,
    sublogin,
  } = props;


  return (
    <span className={classnames(cn(), className)}>
      <span className={cn('Item')}>{login}</span>
      {sublogin && <span className={cn('Item')}>{sublogin}</span>}
    </span>
  );
};


export const UserChipPropTypes = {
  className: PropTypes.string,
  login: PropTypes.string.isRequired,
  sublogin: PropTypes.string,
};


export const UserChipDefaultProps = {
  className: null,
  sublogin: null,
};


UserChip.propTypes = UserChipPropTypes;
UserChip.defaultProps = UserChipDefaultProps;
