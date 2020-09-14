import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import { makeCn } from '@/utils';

import { Loader } from '@/components/Loader';

import './Button.scss';


const cn = makeCn('Button');


export const Button = (props) => {
  const {
    children,
    className,
    type,
    disabled,
    loading,
    disableOnLoading,
    ...rest
  } = props;


  return (
    <button
      className={classnames(cn({ disabled }), className)}
      // eslint-disable-next-line react/button-has-type
      type={type}
      disabled={disabled || (loading && disableOnLoading)}
      {...rest}
    >
      <span className={cn('Inner')}>
        {loading ? <Loader color="light" /> : children}
      </span>
    </button>
  );
};


export const ButtonPropTypes = {
  children: PropTypes.string.isRequired,
  className: PropTypes.string,
  type: PropTypes.oneOf(['button', 'reset', 'submit']),
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  disableOnLoading: PropTypes.bool,
};


export const ButtonDefaultProps = {
  className: null,
  type: 'button',
  disabled: false,
  loading: false,
  disableOnLoading: true,
};


Button.propTypes = ButtonPropTypes;
Button.defaultProps = ButtonDefaultProps;
