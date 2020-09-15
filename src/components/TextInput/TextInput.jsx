import { createElement, useCallback } from 'react';
import PropTypes from 'prop-types';

import { makeCn } from '@/utils';

import './TextInput.scss';


const cn = makeCn('TextInput');


export const TextInput = (props) => {
  const {
    className,
    value,
    type,
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

      className: cn({ area, error }, [className]),
      type: area ? null : type,
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
  type: PropTypes.oneOf(['text', 'password', 'email', 'search', 'tel', 'url']),
  name: PropTypes.string,
  area: PropTypes.bool,
  error: PropTypes.bool,

  onChange: PropTypes.func.isRequired,
};


export const TextInputDefaultProps = {
  className: null,
  type: 'text',
  name: null,
  area: false,
  error: false,
};


TextInput.propTypes = TextInputPropTypes;
TextInput.defaultProps = TextInputDefaultProps;
