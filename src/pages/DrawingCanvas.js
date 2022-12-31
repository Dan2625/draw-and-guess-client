import React from 'react';
//import Button from '../components/UI/Button';
//import Canvas from '../components/UI/Canvas';
import Canvas2 from '../components/UI/Canvas2';
import Card from '../components/UI/Card';

const DrawingCanvas = ({ onCanvasChange }) => {
  return (
    <div style={{ overflow: 'hidden' }}>
      <Card>
        <Canvas2 onCanvasChange={onCanvasChange} />
      </Card>
    </div>
  );
};

export default DrawingCanvas;
