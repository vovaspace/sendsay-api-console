import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import { makeCn } from '@/utils';

import './Button.scss';


const cn = makeCn('Button');


export const Button = (props) => {
  const {
    children,
    className,
    type,
    ...rest
  } = props;


  return (
    <button
      className={classnames(cn(), className)}
      // eslint-disable-next-line react/button-has-type
      type={type}
      {...rest}
    >
      {children}
    </button>
  );
};


export const ButtonPropTypes = {
  children: PropTypes.string.isRequired,
  className: PropTypes.string,
  type: PropTypes.oneOf(['button', 'reset', 'submit']),
};


export const ButtonDefaultProps = {
  className: null,
  type: 'button',
};


Button.propTypes = ButtonPropTypes;
Button.defaultProps = ButtonDefaultProps;
