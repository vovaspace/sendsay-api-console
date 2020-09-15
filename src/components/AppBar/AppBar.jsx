import { createElement } from 'react';
import PropTypes from 'prop-types';

import { makeCn, ChildrenPropType } from '@/utils';

import './AppBar.scss';


const cn = makeCn('AppBar');


export const AppBar = (props) => {
  const {
    children,
    className,
    type,
    tag,
    noPadding,
  } = props;

  return createElement(
    tag,
    {
      className: cn({ type, noPadding }, [className]),
    },
    children,
  );
};


export const AppBarPropTypes = {
  children: ChildrenPropType.isRequired,
  className: PropTypes.string,
  type: PropTypes.oneOf(['top', 'bottom']).isRequired,
  tag: PropTypes.string,
  noPadding: PropTypes.bool,
};


export const AppBarDefaultProps = {
  className: null,
  tag: 'div',
  noPadding: false,
};


AppBar.propTypes = AppBarPropTypes;
AppBar.defaultProps = AppBarDefaultProps;
