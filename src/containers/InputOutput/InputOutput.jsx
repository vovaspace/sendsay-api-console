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
  const [value, setValue] = useState({ input: '', output: '' });

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


  const handleChange = useCallback((nextValue, name) => {
    setValue((currentValue) => ({ ...currentValue, [name]: nextValue }));
  }, []);


  return (
    <div
      ref={rootRef}
      className={classnames(cn(), className)}
    >
      <TextField
        style={{ flexBasis: `${fieldsSize.inputWidth}%` }}
        className={cn('Field', { type: 'input' })}
        inputClassName={cn('Input')}
        value={value.input}
        name="input"
        label="Запрос:"
        area
        shrinkedLabel

        onChange={handleChange}
      />

      <TextField
        style={{ flexBasis: `${fieldsSize.outputWidth}%` }}
        className={cn('Field', { type: 'output' })}
        inputClassName={cn('Input')}
        value={value.output}
        name="output"
        label="Ответ:"
        area
        shrinkedLabel

        onChange={handleChange}
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
