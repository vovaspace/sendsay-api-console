import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { usePopper } from 'react-popper';

import { ChildrenPropType } from '@/utils';

import { Portal } from '@/components/Portal';


export const Popper = (props) => {
  const {
    children,
    className,
    referenceEl,
    placement,
  } = props;


  const [popperEl, setPopperEl] = useState(null);
  const { styles, attributes } = usePopper(referenceEl, popperEl, {
    placement,
  });


  return (
    <Portal>
      <div
        ref={setPopperEl}
        style={styles.popper}
        className={className}
        {...attributes.popper}
      >
        {children}
      </div>
    </Portal>
  );
};


export const PopperPropTypes = {
  children: ChildrenPropType.isRequired,
  className: PropTypes.string,
  referenceEl: PropTypes.instanceOf(Element),
  placement: PropTypes.oneOf([
    'auto',
    'auto-start',
    'auto-end',
    'top',
    'top-start',
    'top-end',
    'bottom',
    'bottom-start',
    'bottom-end',
    'right',
    'right-start',
    'right-end',
    'left',
    'left-start',
    'left-end',
  ]),
};


export const PopperDefaultProps = {
  className: null,
  referenceEl: null,
  placement: 'auto',
};


Popper.propTypes = PopperPropTypes;
Popper.defaultProps = PopperDefaultProps;
