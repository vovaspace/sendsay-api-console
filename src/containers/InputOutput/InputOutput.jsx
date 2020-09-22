import React, { useCallback, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import { makeCn, getElementInnerWidth } from '@/utils';
import { ApiCallerActions } from '@/actions';
import { ApiCallerSelectors } from '@/selectors';

import { TextField } from '@/components/TextField';
import { DragLever } from '@/components/DragLever';

import styles from './InputOutput.scss';


const cn = makeCn('InputOutput', styles);


export const InputOutput = (props) => {
  const {
    className,
  } = props;

  const dispatch = useDispatch();

  const requestValue = useSelector(ApiCallerSelectors.selectRequestValue);
  const responseValue = useSelector(ApiCallerSelectors.selectResponseValue);
  const isCallInvalid = useSelector(ApiCallerSelectors.selectIsCallInvalid);
  const isCallError = useSelector(ApiCallerSelectors.selectIsCallError);

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


  const handleInputChange = useCallback((value) => {
    dispatch(ApiCallerActions.setRequestValue({ value }));
  }, [dispatch]);


  return (
    <div
      ref={rootRef}
      className={cn(null, [className])}
    >
      <TextField
        style={{ flexBasis: `${fieldsSize.inputWidth}%` }}
        className={cn('Field', { type: 'input' })}
        inputClassName={cn('Input')}
        value={requestValue}
        name="request"
        label="Запрос:"
        monospace
        error={isCallInvalid}
        area
        shrinkedLabel

        onChange={handleInputChange}
      />

      <TextField
        style={{ flexBasis: `${fieldsSize.outputWidth}%` }}
        className={cn('Field', { type: 'output' })}
        inputClassName={cn('Input')}
        value={responseValue}
        readOnly
        name="response"
        label="Ответ:"
        monospace
        error={isCallError}
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
