import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import { makeCn } from '@/utils';

import './Copyright.scss';


const cn = makeCn('Copyright');


export const Copyright = (props) => {
  const {
    className,
  } = props;

  return (
    <a
      className={classnames(cn(), className)}
      href="https://github.com/vovaspace"
      target="_blank"
      rel="noreferrer"
    >
      @vovaspace
    </a>
  );
};


export const CopyrightPropTypes = {
  className: PropTypes.string,
};


export const CopyrightDefaultProps = {
  className: null,
};


Copyright.propTypes = CopyrightPropTypes;
Copyright.defaultProps = CopyrightDefaultProps;
