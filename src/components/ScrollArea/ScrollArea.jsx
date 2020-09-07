import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import { makeCn, ChildrenPropType } from '@/utils';

import './ScrollArea.scss';


const cn = makeCn('ScrollArea');


export const ScrollArea = (props) => {
  const {
    children,
    className,
  } = props;

  return (
    <div className={classnames(cn(), className)}>
      <div className={cn('ScrollContainer')}>
        <div className={cn('Inner')}>
          {children}
        </div>
      </div>
    </div>
  );
};


export const ScrollAreaPropTypes = {
  children: ChildrenPropType.isRequired,
  className: PropTypes.string,
};


export const ScrollAreaDefaultProps = {
  className: null,
};


ScrollArea.propTypes = ScrollAreaPropTypes;
ScrollArea.defaultProps = ScrollAreaDefaultProps;
