import React, { useEffect, useRef, useState } from 'react';
//import Card from './Card';
import classes from './Canvas2.module.css';

const Canvas2 = ({ onCanvasChange }) => {
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState('black');
  const [strokeSize, setStrokeSize] = useState(10);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    //resizing
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;

    // context.scale(2, 2);
    contextRef.current = context;
  }, []);

  const startDrawing = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.beginPath();
    contextRef.current.moveTo(offsetX, offsetY);
    setIsDrawing(true);
  };

  const finishDrawing = () => {
    contextRef.current.closePath();
    const canvasData = contextRef.current.canvas.toDataURL('image/png');
    onCanvasChange(canvasData);
    setIsDrawing(false);
  };

  const changeColorAndSize = (data, width) => {
    setColor(data);
    setStrokeSize(width);
  };
  const draw = ({ nativeEvent }) => {
    if (!isDrawing) {
      return;
    }
    contextRef.current.lineWidth = strokeSize;
    contextRef.current.lineCa = 'round';

    // ctx.lineTo(e.clientX, e.clientY);
    if (nativeEvent.type === 'touchmove') {
      contextRef.current.lineTo(
        nativeEvent.touches[0].clientX,
        nativeEvent.touches[0].clientY
      );
    } else if (nativeEvent.type === 'mousemove') {
      contextRef.current.lineTo(nativeEvent.clientX, nativeEvent.clientY);
    }

    contextRef.current.stroke();
    contextRef.current.strokeStyle = color;
    contextRef.current.beginPath();

    // ctx.moveTo(e.clientX, e.clientY);
    if (nativeEvent.type === 'touchmove') {
      contextRef.current.moveTo(
        nativeEvent.touches[0].clientX,
        nativeEvent.touches[0].clientY
      );
    } else if (nativeEvent.type === 'mousemove') {
      contextRef.current.moveTo(nativeEvent.clientX, nativeEvent.clientY);
    }
  };

  return (
    <div>
      <div className={classes.colorButtonBox}>
        <div
          className={classes.black}
          onClick={() => changeColorAndSize('black', 10)}
        ></div>
        <div
          className={classes.red}
          onClick={() => changeColorAndSize('red', 10)}
        ></div>
        <div
          className={classes.green}
          onClick={() => changeColorAndSize('green', 10)}
        ></div>
        <div
          className={classes.blue}
          onClick={() => changeColorAndSize('blue', 10)}
        ></div>
        <div
          className={classes.yellow}
          onClick={() => changeColorAndSize('yellow', 10)}
        ></div>
        <div
          className={classes.eraserButton}
          onClick={() => changeColorAndSize('white ', 10)}
        ></div>
      </div>

      <canvas
        onMouseDown={startDrawing}
        onTouchStart={startDrawing}
        onMouseUp={finishDrawing}
        onTouchEnd={finishDrawing}
        onMouseMove={draw}
        onTouchMove={draw}
        ref={canvasRef}
      />
    </div>
  );
};

export default Canvas2;
