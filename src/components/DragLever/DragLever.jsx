import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';

import { KEYBOARD_KEY } from '@/constants';
import { makeCn } from '@/utils';

import { Icon } from '@/components/Icon';

import styles from './DragLever.scss';


const cn = makeCn('DragLever', styles);


export const DragLever = (props) => {
  const {
    className,
    keyboardMoveSize,
    keyboardMoveShiftMultiplier,

    onDrag,
  } = props;


  const [isDragging, setIsDragging] = useState(false);


  const handleMouseMove = useCallback((event) => {
    const { movementX, movementY } = event;
    onDrag(movementX, movementY);
  }, [onDrag]);


  const handleMouseDown = useCallback(() => {
    setIsDragging(true);
    window.addEventListener('mousemove', handleMouseMove);

    const stopHandling = () => {
      setIsDragging(false);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', stopHandling);
    };

    window.addEventListener('mouseup', stopHandling);
  }, [handleMouseMove]);


  const handleKeyDown = useCallback((event) => {
    const moveSize = event.shiftKey
      ? keyboardMoveSize * keyboardMoveShiftMultiplier
      : keyboardMoveSize;

    switch (event.key) {
      case KEYBOARD_KEY.arrowUp:
        onDrag(0, -moveSize);
        break;

      case KEYBOARD_KEY.arrowRight:
        onDrag(moveSize, 0);
        break;

      case KEYBOARD_KEY.arrowDown:
        onDrag(0, moveSize);
        break;

      case KEYBOARD_KEY.arrowLeft:
        onDrag(-moveSize, 0);
        break;

      default:
        break;
    }
  }, [keyboardMoveSize, keyboardMoveShiftMultiplier, onDrag]);


  return (
    <button
      className={cn({ active: isDragging }, [className])}
      type="button"
      onMouseDown={handleMouseDown}
      onKeyDown={handleKeyDown}
    >
      <span className={cn('Inner')}>
        <Icon
          className={cn('Icon')}
          icon="kebab-vertical"
        />
      </span>
    </button>
  );
};


export const DragLeverPropTypes = {
  className: PropTypes.string,
  keyboardMoveSize: PropTypes.number,
  keyboardMoveShiftMultiplier: PropTypes.number,

  onDrag: PropTypes.func.isRequired,
};


export const DragLeverDefaultProps = {
  className: null,
  keyboardMoveSize: 10,
  keyboardMoveShiftMultiplier: 8,
};


DragLever.propTypes = DragLeverPropTypes;
DragLever.defaultProps = DragLeverDefaultProps;
