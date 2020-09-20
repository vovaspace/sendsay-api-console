import React, { useCallback } from 'react';
import PropTypes from 'prop-types';

import { CALL_STATUS } from '@/constants';
import { makeCn } from '@/utils';

import './RequestChip.scss';


const cn = makeCn('RequestChip');


export const RequestChip = (props) => {
  const {
    children,
    className,
    // id,
    request,
    status,

    onPaste,
  } = props;


  const handlePaste = useCallback(() => {
    onPaste(request);
  }, [request, onPaste]);


  return (
    <div className={cn(null, [className])}>
      <button
        className={cn('Button')}
        type="button"
        onClick={handlePaste}
      >
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
  // id: PropTypes.string.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  request: PropTypes.object.isRequired,
  status: PropTypes.oneOf([CALL_STATUS.error, CALL_STATUS.success]).isRequired,

  onPaste: PropTypes.func.isRequired,
};


export const RequestChipDefaultProps = {
  className: null,
};


RequestChip.propTypes = RequestChipPropTypes;
RequestChip.defaultProps = RequestChipDefaultProps;
