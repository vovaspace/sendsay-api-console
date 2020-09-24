import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { CSSTransition } from 'react-transition-group';

import { BEM_NAMING } from '@/constants';
import { ChildrenPropType, capitalizeFirstLetter } from '@/utils';

import styles from './Transition.scss';


export const Transition = (props) => {
  const {
    children,
    animation,
    ...rest
  } = props;


  const resolvedClassNames = useMemo(() => {
    const prefix = `Transition${BEM_NAMING.element}${capitalizeFirstLetter(animation)}${BEM_NAMING.modifier}`;

    return {
      enter: styles[`${prefix}enter`],
      enterActive: styles[`${prefix}enterActive`],
      enterDone: styles[`${prefix}enterDone`],
      exit: styles[`${prefix}exit`],
      exitActive: styles[`${prefix}exitActive`],
      exitDone: styles[`${prefix}exitDone`],
    };
  }, [animation]);


  return (
    <CSSTransition
      {...rest}
      classNames={resolvedClassNames}
    >
      {children}
    </CSSTransition>
  );
};


export const TransitionPropTypes = {
  children: PropTypes.oneOfType([ChildrenPropType, PropTypes.func]).isRequired,
  classNames: PropTypes.string,

  animation: PropTypes.oneOf([
    'slip',
  ]).isRequired,
};


export const TransitionDefaultProps = {
  classNames: null,
};


Transition.propTypes = TransitionPropTypes;
Transition.defaultProps = TransitionDefaultProps;
