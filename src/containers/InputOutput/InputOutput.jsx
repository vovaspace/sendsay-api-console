import React, { useCallback, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import { makeCn, getElementInnerWidth } from '@/utils';

import { TextField } from '@/components/TextField';
import { DragLever } from '@/components/DragLever';

import './InputOutput.scss';


const cn = makeCn('InputOutput');


export const InputOutput = (props) => {
  const {
    className,
  } = props;

  const [fieldsSize, setFieldsSize] = useState({ inputWidth: 50, outputWidth: 50 });

  const rootRef = useRef(null);

  const handleDrag = useCallback((x) => {
    const rootWidth = getElementInnerWidth(rootRef.current);
    const shiftInPercent = (x / rootWidth) * 100;

    setFieldsSize(({ inputWidth }) => {
      const newInputWidth = inputWidth + shiftInPercent;

      return ({
        inputWidth: newInputWidth,
        outputWidth: 100 - newInputWidth,
      });
    });
  }, []);


  return (
    <div
      ref={rootRef}
      className={classnames(cn(), className)}
    >
      <TextField
        className={cn('Field', { type: 'input' })}
        style={{ flexBasis: `${fieldsSize.inputWidth}%` }}
        inputClassName={cn('Input')}
        label="Запрос:"
        area
        shrinkedLabel
      />

      <TextField
        className={cn('Field', { type: 'output' })}
        style={{ flexBasis: `${fieldsSize.outputWidth}%` }}
        inputClassName={cn('Input')}
        label="Ответ:"
        area
        shrinkedLabel
      />

      <DragLever
        className={cn('DragLever')}
        onDrag={handleDrag}
      />
    </div>
  );
};


export const InputOutputPropTypes = {
  className: PropTypes.string,
};


export const InputOutputDefaultProps = {
  className: null,
};


InputOutput.propTypes = InputOutputPropTypes;
InputOutput.defaultProps = InputOutputDefaultProps;
