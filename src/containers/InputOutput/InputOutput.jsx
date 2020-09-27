import React, { useCallback, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import { KEYBOARD_KEY } from '@/constants';
import { makeCn, getElementInnerWidth } from '@/utils';
import { ApiCallerActions, UserInterfaceActions } from '@/actions';
import { ApiCallerSelectors, UserInterfaceSelectors } from '@/selectors';

import { TextField } from '@/components/TextField';
import { DragLever } from '@/components/DragLever';

import styles from './InputOutput.scss';


const MIN_FIELD_WIDTH = Number.parseInt(styles['var-min-field-width'], 10);


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

  const inputOutputFieldsRatio = useSelector(UserInterfaceSelectors.selectInputOutputFieldsRatio);

  const innerRef = useRef(null);
  const inputFieldRef = useRef(null);
  const outputFieldRef = useRef(null);


  const handleDrag = useCallback((x) => {
    const { current: { offsetWidth: inputFieldWidth } } = inputFieldRef;
    const { current: { offsetWidth: outputFieldWidth } } = outputFieldRef;

    if (
      x === 0
      || (x < 0 && inputFieldWidth <= MIN_FIELD_WIDTH)
      || (x > 0 && outputFieldWidth <= MIN_FIELD_WIDTH)
    ) {
      return;
    }

    const rootWidth = getElementInnerWidth(innerRef.current);
    const shiftInPercent = (x / (rootWidth)) * 100;

    dispatch(UserInterfaceActions.shiftInputOutputFieldsRatio({
      size: shiftInPercent,
    }));
  }, [dispatch]);


  const handleInputKeyDown = useCallback((event) => {
    // Call by Shift+Enter
    if (event.key === KEYBOARD_KEY.enter && event.shiftKey) {
      event.preventDefault();
      dispatch(ApiCallerActions.makeCallRequest());
    }
  }, [dispatch]);


  const handleInputChange = useCallback((value) => {
    dispatch(ApiCallerActions.setRequestValue({ value }));
  }, [dispatch]);


  return (
    <div
      className={cn(null, [className])}
    >
      <div ref={innerRef} className={cn('Inner')}>
        <TextField
          ref={inputFieldRef}
          style={{ flexBasis: `${inputOutputFieldsRatio}%` }}
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
          onKeyDown={handleInputKeyDown}
        />

        <TextField
          ref={outputFieldRef}
          style={{ flexBasis: `${100 - inputOutputFieldsRatio}%` }}
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
