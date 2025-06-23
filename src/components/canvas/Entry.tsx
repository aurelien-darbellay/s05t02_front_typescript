import React, { useState, useRef, useEffect, useLayoutEffect } from 'react';
import { ContainerEntry, Position } from '../../model/EntriesGeneralFeatures';
import { getEntryStyle } from './entryStyle';
import {
  createHandleMouseDown,
  createHandleMouseMove,
} from './entryInteractionHandlers';

interface EntryProps {
  entry: ContainerEntry;
  children: React.ReactNode;
  onPositionChange: (entry: ContainerEntry, newPos: Position) => void;
  onSizeChange?: (
    entry: ContainerEntry,
    newSize: { width: number; height: number }
  ) => void;
  width: number;
  setExistOpenEntry: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Entry: React.FC<EntryProps> = ({
  entry,
  children,
  onPositionChange,
  onSizeChange,
  width,
  setExistOpenEntry,
}) => {
  const [dragging, setDragging] = useState(false);
  const [resizing, setResizing] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [scaleFactor, setScaleFactor] = useState(1);
  const originMouse = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const originPos = useRef<Position>({ xCord: 0, yCord: 0 });
  const originScale = useRef<number>(1);
  const entryRef = useRef<HTMLDivElement | null>(null);

  const displayLabel = entry.type;

  const handleMouseDown = createHandleMouseDown(
    entry,
    setDragging,
    setResizing,
    originMouse,
    originPos,
    originScale,
    scaleFactor
  );

  const handleMouseMove = createHandleMouseMove(
    entry,
    setHovered,
    setExistOpenEntry,
    dragging,
    resizing,
    onPositionChange,
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

  useLayoutEffect(() => {
    if (entryRef.current && onSizeChange) {
      const rect = entryRef.current.getBoundingClientRect();
      onSizeChange(entry, { width: rect.width, height: rect.height });
    }
  }, [hovered, children, scaleFactor]);

  return (
    <div
      ref={entryRef}
      onMouseDown={handleMouseDown}
      onMouseEnter={() => {
        setHovered(true);
        setExistOpenEntry(true);
      }}
      onMouseLeave={() => {
        if (!resizing) {
          setHovered(false);
          setExistOpenEntry(false);
        }
      }}
      style={getEntryStyle(
        entry,
        hovered,
        dragging,
        resizing,
        scaleFactor,
        width
      )}
    >
      <div
        style={{
          cursor: 'grab',
          fontFamily: 'Bangers',
          fontSize: `${1.5}rem`,
          letterSpacing: `${0.04}em`,
          fontWeight: 'bold',
          userSelect: 'none',
          textAlign: 'center',
          marginBottom: hovered ? 0 : '-5px',
        }}
      >
        {displayLabel}
      </div>
      {hovered && children}
      {hovered && (
        <div
          className="resize-handle"
          style={{
            position: 'absolute',
            right: 0,
            bottom: 0,
            width: '16px',
            height: '16px',
            cursor: 'nwse-resize',
            background: entry.color,
          }}
        />
      )}
    </div>
  );
};
