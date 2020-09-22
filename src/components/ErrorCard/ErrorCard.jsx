import React, { createElement, useMemo } from 'react';
import PropTypes from 'prop-types';

import { makeCn } from '@/utils';

import { Icon } from '@/components/Icon';

import styles from './ErrorCard.scss';


const cn = makeCn('ErrorCard', styles);


export const ErrorCard = (props) => {
  const {
    className,
    message,
    messageTag,
    error,
  } = props;


  const description = useMemo(() => {
    if (!error) {
      return null;
    }

    return (
      <p className={cn('Description')}>
        {typeof error === 'string' ? error : JSON.stringify(error, null, ' ')}
      </p>
    );
  }, [error]);


  return (
    <section
      className={cn(null, [className])}
      role="alert"
    >
      <Icon className={cn('Icon')} icon="meh" />

      <div className={cn('TextContainer')}>
        {createElement(
          messageTag,
          { className: cn('Message') },
          message,
        )}

        {description}
      </div>
    </section>
  );
};


export const ErrorCardPropTypes = {
  className: PropTypes.string,
  message: PropTypes.string.isRequired,
  messageTag: PropTypes.string,
  error: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
};


export const ErrorCardDefaultProps = {
  className: null,
  messageTag: 'h2',
  error: null,
};


ErrorCard.propTypes = ErrorCardPropTypes;
ErrorCard.defaultProps = ErrorCardDefaultProps;
