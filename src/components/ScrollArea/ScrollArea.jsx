import React from 'react';
import PropTypes from 'prop-types';

import { makeCn, ChildrenPropType } from '@/utils';

import styles from './ScrollArea.scss';


const cn = makeCn('ScrollArea', styles);


export const ScrollArea = (props) => {
  const {
    children,
    className,
  } = props;

  return (
    <div className={cn(null, [className])}>
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
