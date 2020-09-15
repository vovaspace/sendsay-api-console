import React, { createElement, useMemo } from 'react';
import PropTypes from 'prop-types';

import { makeCn } from '@/utils';

import { Icon } from '@/components/Icon';

import './ErrorCard.scss';


const cn = makeCn('ErrorCard');


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

    // Error without request
    const { request, ...rest } = error;

    return (
      <p className={cn('Description')}>{JSON.stringify(rest)}</p>
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
  error: PropTypes.shape({
    id: PropTypes.string.isRequired,
    explain: PropTypes.string,
    // eslint-disable-next-line react/forbid-prop-types
    request: PropTypes.object,
  }),
};


export const ErrorCardDefaultProps = {
  className: null,
  messageTag: 'h2',
  error: null,
};


ErrorCard.propTypes = ErrorCardPropTypes;
ErrorCard.defaultProps = ErrorCardDefaultProps;
