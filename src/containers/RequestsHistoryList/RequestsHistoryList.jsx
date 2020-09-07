import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import { makeCn } from '@/utils';

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


  return (
    <AppBar
      className={classnames(cn(), className)}
      tag="aside"
      type="top"
      noPadding
    >
      <ScrollArea className={cn('ScrollArea')}>
        <ul className={cn('List')}>
          <li className={cn('ListItem')}>
            <RequestChip
              status="success"
            >
              action.name
            </RequestChip>
          </li>
          <li className={cn('ListItem')}>
            <RequestChip
              status="success"
            >
              action.name
            </RequestChip>
          </li>
          <li className={cn('ListItem')}>
            <RequestChip
              status="success"
            >
              action.name
            </RequestChip>
          </li>
        </ul>
      </ScrollArea>

      <div className={cn('CleanButtonContainer')}>
        <IconButton
          icon="cancel"
          hiddenLabel
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
