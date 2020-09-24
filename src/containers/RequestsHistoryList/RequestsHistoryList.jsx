import React, { useCallback } from 'react';
import { useDispatch, useSelector, batch } from 'react-redux';
import PropTypes from 'prop-types';

import { makeCn, stringifyCall } from '@/utils';
import { RequestsHistoryActions, ApiCallerActions, ClipboardActions } from '@/actions';
import { RequestsHistorySelectors } from '@/selectors';

import { AppBar } from '@/components/AppBar';
import { ScrollArea } from '@/components/ScrollArea';
import { RequestChip } from '@/components/RequestChip';
import { IconButton } from '@/components/IconButton';

import styles from './RequestsHistoryList.scss';


const cn = makeCn('RequestsHistoryList', styles);


export const RequestsHistoryList = (props) => {
  const {
    className,
  } = props;

  const dispatch = useDispatch();

  const items = useSelector(RequestsHistorySelectors.selectItems);
  const notifications = useSelector(RequestsHistorySelectors.selectNotifications);


  const handlePaste = useCallback((id, request) => {
    dispatch(ApiCallerActions.setRequestValue({
      value: stringifyCall(request),
    }));
  }, [dispatch]);

  const handleCall = useCallback((id, request) => {
    batch(() => {
      handlePaste(request);
      dispatch(ApiCallerActions.makeCallRequest());
    });
  }, [handlePaste, dispatch]);

  const handleCopy = useCallback((id, request) => {
    dispatch(ClipboardActions.copy({
      text: stringifyCall(request),
      actionSuccess: RequestsHistoryActions.addNotification({ itemId: id, message: 'Скопировано' }),
      actionFailure: RequestsHistoryActions.addNotification({ itemId: id, message: 'Ошибочка :(' }),
    }));
  }, [dispatch]);

  const handleRemove = useCallback((id) => {
    dispatch(RequestsHistoryActions.removeItem({ id }));
  }, [dispatch]);


  const handleClear = useCallback(() => {
    dispatch(RequestsHistoryActions.clear());
  }, [dispatch]);


  return (
    <AppBar
      className={cn(null, [className])}
      tag="aside"
      type="top"
      noPadding
    >
      <ScrollArea className={cn('ScrollArea')}>
        <ul className={cn('List')}>
          {items.map(({ id, request, status }) => {
            const notification = notifications.find((n) => n.itemId === id);

            return (
              <li key={id} className={cn('ListItem')}>
                <RequestChip
                  id={id}
                  request={request}
                  status={status}
                  notification={notification}

                  onPaste={handlePaste}
                  onCall={handleCall}
                  onCopy={handleCopy}
                  onRemove={handleRemove}
                >
                  {request.action || 'unknown'}
                </RequestChip>
              </li>
            );
          })}
        </ul>
      </ScrollArea>

      <div className={cn('CleanButtonContainer')}>
        <IconButton
          icon="cancel"
          hiddenLabel
          disabled={items.length === 0}

          onClick={handleClear}
        >
          Очистить историю запросов
        </IconButton>
      </div>
    </AppBar>
  );
};


export const RequestsHistoryListPropTypes = {
  className: PropTypes.string,
};


export const RequestsHistoryListDefaultProps = {
  className: null,
};


RequestsHistoryList.propTypes = RequestsHistoryListPropTypes;
RequestsHistoryList.defaultProps = RequestsHistoryListDefaultProps;
