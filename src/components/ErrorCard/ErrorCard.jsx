import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import { makeCn } from '@/utils';

import { Icon } from '@/components/Icon';

import './ErrorCard.scss';


const cn = makeCn('ErrorCard');


export const ErrorCard = (props) => {
  const {
    className,
    message,
    description,
  } = props;


  return (
    <section
      className={classnames(cn(), className)}
      role="alert"
    >
      <Icon className={cn('Icon')} icon="meh" />

      <div className={cn('TextContainer')}>
        <h2 className={cn('Message')}>{message}</h2>
        {description && <p className={cn('Description')}>{description}</p>}
      </div>
    </section>
  );
};


export const ErrorCardPropTypes = {
  className: PropTypes.string,
  message: PropTypes.string.isRequired,
  description: PropTypes.string,
};


export const ErrorCardDefaultProps = {
  className: null,
  description: null,
};


ErrorCard.propTypes = ErrorCardPropTypes;
ErrorCard.defaultProps = ErrorCardDefaultProps;
