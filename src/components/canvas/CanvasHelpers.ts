import React, { useState, useLayoutEffect } from 'react';

export const useCanvasSize = (
  canvasRef: React.RefObject<HTMLElement | null>
) => {
  const [canvasSize, setCanvasSize] = useState({ canvasWidth: 0, height: 0 });
  const [canvasReady, setCanvasReady] = useState(false);

  useLayoutEffect(() => {
    if (!canvasRef || !canvasRef.current) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const updateSize = () => {
      const { width, height } = canvas.getBoundingClientRect();
      if (width > 0 && height > 0) {
        setCanvasSize({ canvasWidth: width, height });
        setCanvasReady(true);
      }
    };

    updateSize(); // Initial check

    const resizeObserver = new ResizeObserver(updateSize);
    resizeObserver.observe(canvas);

    return () => resizeObserver.disconnect();
  }, [canvasRef]);

  return { canvasSize, canvasReady };
};
