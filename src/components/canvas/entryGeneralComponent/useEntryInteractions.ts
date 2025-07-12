import { useState, useEffect, useRef } from 'react';
import {
  createHandleMouseDown,
  createHandleMouseMove,
} from '../entryInteractionHandlers';
import { Position } from '../../../model/EntriesGeneralFeatures';

export function useEntryInteractions({
  entry,
  updatePosition,
  width,
  setHovered,
  setExistOpenEntry,
}: {
  entry: any;
  updatePosition: any;
  width: number;
  setHovered: (v: boolean) => void;
  setExistOpenEntry: (v: boolean) => void;
}) {
  const [dragging, setDragging] = useState(false);
  const [resizing, setResizing] = useState(false);
  const [scaleFactor, setScaleFactor] = useState(1);

  const originMouse = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const originPos = useRef<Position>({ xCord: 0, yCord: 0 });
  const originScale = useRef<number>(1);

  const handleMouseDown = createHandleMouseDown(
    entry,
    setDragging,
    setResizing,
    originMouse,
    originPos,
    originScale,
    scaleFactor,
    setHovered
  );

  const handleMouseMove = createHandleMouseMove(
    entry,
    setHovered,
    setExistOpenEntry,
    dragging,
    resizing,
    updatePosition,
    width,
    originMouse,
    originPos,
    originScale,
    setScaleFactor
  );

  const handleMouseUp = () => {
    if (dragging) setDragging(false);
    if (resizing) setResizing(false);
  };

  useEffect(() => {
    if (dragging || resizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [dragging, resizing]);

  return {
    dragging,
    resizing,
    scaleFactor,
    handleMouseDown,
  };
}
