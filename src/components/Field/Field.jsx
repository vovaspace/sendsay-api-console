import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import { makeCn, ChildrenPropType, StylePropType } from '@/utils';

import './Field.scss';


const cn = makeCn('Field');


export const Field = (props) => {
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
    <label style={style} className={classnames(cn(), className)}>
      <span className={cn('Label', { error, shrinked: shrinkedLabel })}>
        {label}
        {!required && <span className={cn('OptionalBadge')}>Опционально</span>}
      </span>

      {children}
    </label>
  );
};


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
