import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';

import { makeCn, ChildrenPropType, StylePropType } from '@/utils';

import styles from './Field.scss';


const cn = makeCn('Field', styles);


// eslint-disable-next-line prefer-arrow-callback
export const Field = forwardRef(function Field(props, ref) {
  const {
    children,
    style,
    className,
    label,
    required,
    error,
    shrinkedLabel,
  } = props;


  return (
    // eslint-disable-next-line jsx-a11y/label-has-associated-control
    <label ref={ref} style={style} className={cn(null, [className])}>
      <span className={cn('Label', { error, shrinked: shrinkedLabel })}>
        {label}
        {!required && <span className={cn('OptionalBadge')}>Опционально</span>}
      </span>

      {children}
    </label>
  );
});


export const FieldPropTypes = {
  children: ChildrenPropType.isRequired,
  style: StylePropType,
  className: PropTypes.string,
  label: PropTypes.string.isRequired,
  required: PropTypes.bool,
  error: PropTypes.bool,
  shrinkedLabel: PropTypes.bool,
};


export const FieldDefaultProps = {
  className: null,
  style: null,
  required: true,
  error: false,
  shrinkedLabel: false,
};


Field.propTypes = FieldPropTypes;
Field.defaultProps = FieldDefaultProps;
