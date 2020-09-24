import { createElement, useMemo } from 'react';
import PropTypes from 'prop-types';

import { makeCn } from '@/utils';

import styles from './TextInput.scss';


const cn = makeCn('TextInput', styles);


export const TextInput = (props) => {
  const {
    className,
    value,
    type,
    name,
    area,
    error,
    monospace,

    onChange,

    ...rest
  } = props;


  const tag = area ? 'textarea' : 'input';


  const handleChange = useMemo(() => (
    onChange
      ? (event) => {
        const { target: { value: nextValue } } = event;
        onChange(nextValue, name);
      }
      : null),
  [name, onChange]);


  return createElement(
    tag,
    {
      ...rest,

      className: cn({ area, error, monospace }, [className]),
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
  monospace: PropTypes.bool,

  onChange: PropTypes.func,
};


export const TextInputDefaultProps = {
  className: null,
  type: 'text',
  name: null,
  area: false,
  error: false,
  monospace: false,

  onChange: null,
};


TextInput.propTypes = TextInputPropTypes;
TextInput.defaultProps = TextInputDefaultProps;
