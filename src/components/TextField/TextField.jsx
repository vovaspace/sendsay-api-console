import React from 'react';
import PropTypes from 'prop-types';

import { Field, FieldPropTypes } from '@/components/Field';
import { TextInput, TextInputPropTypes } from '@/components/TextInput';


export const TextField = (props) => {
  const {
    className,
    inputClassName,
    error,
    label,
    required,
    shrinkedLabel,
    area,
    ...rest
  } = props;


  return (
    <Field
      className={className}
      label={label}
      required={required}
      shrinkedLabel={shrinkedLabel}
      error={error}
    >
      <TextInput
        className={inputClassName}
        area={area}
        error={error}
        {...rest}
      />
    </Field>
  );
};


export const TextFieldPropTypes = {
  error: PropTypes.bool,

  /* eslint-disable react/require-default-props */
  className: FieldPropTypes.className,
  label: FieldPropTypes.label,
  required: FieldPropTypes.required,
  shrinkedLabel: FieldPropTypes.shrinkedLabel,

  inputClassName: TextInputPropTypes.className,
  area: TextInputPropTypes.area,
  /* eslint-enable react/require-default-props */
};


export const TextFieldDefaultProps = {
  error: false,
};


TextField.propTypes = TextFieldPropTypes;
TextField.defaultProps = TextFieldDefaultProps;
