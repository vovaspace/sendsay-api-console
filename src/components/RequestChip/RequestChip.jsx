import React from 'react';
import PropTypes from 'prop-types';

import { CALL_STATUS } from '@/constants';
import { makeCn } from '@/utils';

import './RequestChip.scss';


const cn = makeCn('RequestChip');


export const RequestChip = (props) => {
  const {
    children,
    className,
    status,
  } = props;


  return (
    <div className={cn(null, [className])}>
      <button className={cn('Button')} type="button">
        <span className={cn('ButtonInner')}>
          <span className={cn('StatusIndicator', { type: status })} />
          {children}
        </span>
      </button>
    </div>
  );
};


export const RequestChipPropTypes = {
  children: PropTypes.string.isRequired,
  className: PropTypes.string,
  status: PropTypes.oneOf([CALL_STATUS.error, CALL_STATUS.success]).isRequired,
};


export const RequestChipDefaultProps = {
  className: null,
};


RequestChip.propTypes = RequestChipPropTypes;
RequestChip.defaultProps = RequestChipDefaultProps;
