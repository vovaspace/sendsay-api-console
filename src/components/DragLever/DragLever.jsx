import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import { KEYBOARD_KEY } from '@/constants';
import { makeCn } from '@/utils';

import { Icon } from '@/components/Icon';

import './DragLever.scss';


const cn = makeCn('DragLever');


export const DragLever = (props) => {
  const {
    className,
    keyboardMoveSize,

    onDrag,
  } = props;


  const handleMouseMove = useCallback((event) => {
    const { movementX, movementY } = event;
    onDrag(movementX, movementY);
  }, [onDrag]);


  const handleMouseDown = useCallback(() => {
    window.addEventListener('mousemove', handleMouseMove);

    const stopHandling = () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', stopHandling);
    };

    window.addEventListener('mouseup', stopHandling);
  }, [handleMouseMove]);


  const handleKeyDown = useCallback((event) => {
    switch (event.key) {
      case KEYBOARD_KEY.arrowUp:
        onDrag(0, -keyboardMoveSize);
        break;

      case KEYBOARD_KEY.arrowRight:
        onDrag(keyboardMoveSize, 0);
        break;

      case KEYBOARD_KEY.arrowDown:
        onDrag(0, keyboardMoveSize);
        break;

      case KEYBOARD_KEY.arrowLeft:
        onDrag(-keyboardMoveSize, 0);
        break;

      default:
        break;
    }
  }, [keyboardMoveSize, onDrag]);


  return (
    <button
      className={classnames(cn(), className)}
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

  onDrag: PropTypes.func.isRequired,
};


export const DragLeverDefaultProps = {
  className: null,
  keyboardMoveSize: 10,
};


DragLever.propTypes = DragLeverPropTypes;
DragLever.defaultProps = DragLeverDefaultProps;
