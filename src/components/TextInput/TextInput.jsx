import { createElement } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import { makeCn } from '@/utils';

import './TextInput.scss';


const cn = makeCn('TextInput');


export const TextInput = (props) => {
  const {
    className,
    area,
    error,
    ...rest
  } = props;


  const tag = area ? 'textarea' : 'input';


  return createElement(
    tag,
    {
      ...rest,
      className: classnames(cn({ area, error }), className),
      type: area ? null : 'text',
    },
    null,
  );
};


export const TextInputPropTypes = {
  className: PropTypes.string,
  area: PropTypes.bool,
  error: PropTypes.bool,
};


export const TextInputDefaultProps = {
  className: null,
  area: false,
  error: false,
};


TextInput.propTypes = TextInputPropTypes;
TextInput.defaultProps = TextInputDefaultProps;
