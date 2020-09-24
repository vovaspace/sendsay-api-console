import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { TransitionGroup } from 'react-transition-group';

import { CALL_STATUS } from '@/constants';
import { makeCn } from '@/utils';

import { ButtonMenu } from '@/components/ButtonMenu';
import { MenuListItem, MenuListDivider } from '@/components/MenuList';
import { Transition } from '@/components/Transition';
import { Notification } from '@/components/Notification';

import styles from './RequestChip.scss';


const cn = makeCn('RequestChip', styles);


export const RequestChip = (props) => {
  const {
    children,
    className,
    id,
    request,
    status,
    notification,

    onPaste,
    onCall,
    onCopy,
    onRemove,
  } = props;


  const [rootEl, setRootEl] = useState(null);


  const handlePaste = useCallback(() => {
    onPaste(id, request);
  }, [id, request, onPaste]);

  const handleCall = useCallback(() => {
    onCall(id, request);
  }, [id, request, onCall]);

  const handleCopy = useCallback(() => {
    onCopy(id, request);
  }, [id, request, onCopy]);

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


      <TransitionGroup className={cn('NotificationContainer')}>
        {notification && (
          <Transition
            key={notification.id}
            animation="slip"
            timeout={1000}
          >
            {() => <Notification className={cn('Notification')}>{notification.message}</Notification>}
          </Transition>
        )}
      </TransitionGroup>
    </div>
  );
};


export const RequestChipPropTypes = {
  children: PropTypes.string.isRequired,
  className: PropTypes.string,
  id: PropTypes.string.isRequired,
  request: PropTypes.string.isRequired,
  status: PropTypes.oneOf([CALL_STATUS.error, CALL_STATUS.success]).isRequired,
  notification: PropTypes.shape({
    id: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
  }),

  onPaste: PropTypes.func.isRequired,
  onCall: PropTypes.func.isRequired,
  onCopy: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
};


export const RequestChipDefaultProps = {
  className: null,
  notification: null,
};


RequestChip.propTypes = RequestChipPropTypes;
RequestChip.defaultProps = RequestChipDefaultProps;
