import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import { makeCn } from '@/utils';

import './Logotype.scss';


const cn = makeCn('Logotype');


export const Logotype = (props) => {
  const {
    className,
    hiddenTitle,
  } = props;

  return (
    <div className={classnames(cn(), className)}>
      <div className={cn('Image')} />
      <h1 className={cn('Title', { hidden: hiddenTitle })}>API-консолька</h1>
    </div>
  );
};


export const LogotypePropTypes = {
  className: PropTypes.string,
  hiddenTitle: PropTypes.bool,
};


export const LogotypeDefaultProps = {
  className: null,
  hiddenTitle: false,
};


Logotype.propTypes = LogotypePropTypes;
Logotype.defaultProps = LogotypeDefaultProps;
