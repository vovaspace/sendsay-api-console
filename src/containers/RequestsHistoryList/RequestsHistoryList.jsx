import React, { useCallback } from 'react';
import { useDispatch, useSelector, batch } from 'react-redux';
import PropTypes from 'prop-types';

import { makeCn, stringifyCall } from '@/utils';
import { RequestsHistoryActions, ApiCallerActions } from '@/actions';
import { RequestsHistorySelectors } from '@/selectors';

import { AppBar } from '@/components/AppBar';
import { ScrollArea } from '@/components/ScrollArea';
import { RequestChip } from '@/components/RequestChip';
import { IconButton } from '@/components/IconButton';

import './RequestsHistoryList.scss';


const cn = makeCn('RequestsHistoryList');


export const RequestsHistoryList = (props) => {
  const {
    className,
  } = props;

  const dispatch = useDispatch();

  const items = useSelector(RequestsHistorySelectors.selectItems);


  const handlePaste = useCallback((request) => {
    dispatch(ApiCallerActions.setRequestValue({
      value: stringifyCall(request),
    }));
  }, [dispatch]);

  const handleCall = useCallback((request) => {
    batch(() => {
      handlePaste(request);
      dispatch(ApiCallerActions.makeCallRequest());
    });
  }, [handlePaste, dispatch]);

  const handleCopy = useCallback((request) => {
    console.log('copy', request);
  }, []);

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
          {items.map(({ id, request, status }) => (
            <li key={id} className={cn('ListItem')}>
              <RequestChip
                id={id}
                request={request}
                status={status}

                onPaste={handlePaste}
                onCall={handleCall}
                onCopy={handleCopy}
                onRemove={handleRemove}
              >
                {request.action || 'unknown'}
              </RequestChip>
            </li>
          ))}
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
