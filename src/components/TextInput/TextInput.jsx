import { createElement, useCallback } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import { makeCn } from '@/utils';

import './TextInput.scss';


const cn = makeCn('TextInput');


export const TextInput = (props) => {
  const {
    className,
    value,
    name,
    area,
    error,

    onChange,

    ...rest
  } = props;


  const tag = area ? 'textarea' : 'input';


  const handleChange = useCallback((event) => {
    const { target: { value: nextValue } } = event;
    onChange(nextValue, name);
  }, [name, onChange]);


  return createElement(
    tag,
    {
      ...rest,

      className: classnames(cn({ area, error }), className),
      type: area ? null : 'text',
      value,
      name,

      onChange: handleChange,
    },
    null,
  );
};


export const TextInputPropTypes = {
  className: PropTypes.string,
  value: PropTypes.string.isRequired,
  name: PropTypes.string,
  area: PropTypes.bool,
  error: PropTypes.bool,

  onChange: PropTypes.func.isRequired,
};


export const TextInputDefaultProps = {
  className: null,
  name: null,
  area: false,
  error: false,
};


TextInput.propTypes = TextInputPropTypes;
TextInput.defaultProps = TextInputDefaultProps;
