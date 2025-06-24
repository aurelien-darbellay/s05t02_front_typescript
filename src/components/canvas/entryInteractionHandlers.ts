// src/components/canvas/entryInteractionHandlers.ts
import { RefObject } from 'react';
import { ContainerEntry, Position } from '../../model/EntriesGeneralFeatures';

export const createHandleMouseDown = (
  entry: ContainerEntry,
  setDragging: (d: boolean) => void,
  setResizing: (r: boolean) => void,
  originMouse: RefObject<{ x: number; y: number }>,
  originPos: RefObject<Position>,
  originScale: RefObject<number>,
  scaleFactor: number,
  setHovered: (hovered: boolean) => void
) => {
  return (e: React.MouseEvent) => {
    setHovered(true);
    if ((e.target as HTMLElement).classList.contains('resize-handle')) {
      originMouse.current = { x: e.clientX, y: e.clientY };
      originScale.current = scaleFactor;
      setResizing(true);
    } else {
      //if (!resizing) setHovered(false);
      e.preventDefault();
      originMouse.current = { x: e.clientX, y: e.clientY };
      originPos.current = { ...entry.position };
      setDragging(true);
    }
  };
};

export const createHandleMouseMove = (
  entry: ContainerEntry,
  setHovered: (hovered: boolean) => void,
  setExistOpenEntry: (e: boolean) => void,
  dragging: boolean,
  resizing: boolean,
  onPositionChange: (entry: ContainerEntry, newPos: Position) => void,
  width: number,
  originMouse: RefObject<{ x: number; y: number }>,
  originPos: RefObject<Position>,
  originScale: RefObject<number>,
  setScaleFactor: (scale: number) => void
) => {
  return (e: MouseEvent) => {
    setHovered(true);
    setExistOpenEntry(true);
    if (dragging) {
      //console.log('Dragging');
      e.preventDefault();
      const deltaX = e.clientX / width - originMouse.current.x / width;
      const deltaY = e.clientY - originMouse.current.y;
      const newPos: Position = {
        xCord: originPos.current.xCord + deltaX,
        yCord: originPos.current.yCord + deltaY,
      };
      onPositionChange(entry, newPos);
    } else if (resizing) {
      const delta = e.clientX - originMouse.current.x;
      const newScale = Math.max(0.5, originScale.current + delta / 250);
      setScaleFactor(newScale);
    }
  };
};
