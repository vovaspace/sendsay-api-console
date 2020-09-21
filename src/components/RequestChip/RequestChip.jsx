import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';

import { CALL_STATUS } from '@/constants';
import { makeCn } from '@/utils';

import { ButtonMenu } from '@/components/ButtonMenu';
import { MenuListItem, MenuListDivider } from '@/components/MenuList';

import './RequestChip.scss';


const cn = makeCn('RequestChip');


export const RequestChip = (props) => {
  const {
    children,
    className,
    id,
    request,
    status,

    onPaste,
    onCall,
    onCopy,
    onRemove,
  } = props;


  const [rootEl, setRootEl] = useState(null);


  const handlePaste = useCallback(() => {
    onPaste(request);
  }, [request, onPaste]);

  const handleCall = useCallback(() => {
    onCall(request);
  }, [request, onCall]);

  const handleCopy = useCallback(() => {
    onCopy(request);
  }, [request, onCopy]);

  const handleRemove = useCallback(() => {
    onRemove(id);
  }, [id, onRemove]);


  return (
    <div
      ref={setRootEl}
      className={cn(null, [className])}
    >
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

      <ButtonMenu
        className={cn('ButtonMenu')}
        htmlId={`request-history-item-menu-${id}`}
        referenceEl={rootEl}
      >
        <MenuListItem onClick={handleCall}>Выполнить</MenuListItem>
        <MenuListItem onClick={handleCopy}>Скопировать</MenuListItem>
        <MenuListDivider />
        <MenuListItem destructive onClick={handleRemove}>Удалить</MenuListItem>
      </ButtonMenu>
    </div>
  );
};


export const RequestChipPropTypes = {
  children: PropTypes.string.isRequired,
  className: PropTypes.string,
  id: PropTypes.string.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  request: PropTypes.object.isRequired,
  status: PropTypes.oneOf([CALL_STATUS.error, CALL_STATUS.success]).isRequired,

  onPaste: PropTypes.func.isRequired,
  onCall: PropTypes.func.isRequired,
  onCopy: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
};


export const RequestChipDefaultProps = {
  className: null,
};


RequestChip.propTypes = RequestChipPropTypes;
RequestChip.defaultProps = RequestChipDefaultProps;
