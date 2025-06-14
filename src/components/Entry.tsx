/* import React, { useState, useRef, useEffect } from 'react';
import { ContainerEntry, Position } from '../model/EntriesGeneralFeatures';

interface EntryProps {
  entry: ContainerEntry;
  children: React.ReactNode;
  onPositionChange: (entry: ContainerEntry, newPos: Position) => void;
}

export const Entry: React.FC<EntryProps> = ({ entry, children, onPositionChange }) => {
  const [dragging, setDragging] = useState(false);
  const [hovered, setHovered] = useState(false);
  const originMouse = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const originPos = useRef<Position>({ xCord: 0, yCord: 0 });

  const displayLabel = entry.type; 

  const handleMouseDown = (e: React.MouseEvent) => {
    setHovered(false)
    e.preventDefault();
    originMouse.current = { x: e.clientX, y: e.clientY };
    originPos.current = { ...entry.position };
    setDragging(true);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!dragging) return;
    const deltaX = e.clientX - originMouse.current.x;
    const deltaY = e.clientY - originMouse.current.y;
    const newPos: Position = {
      xCord: originPos.current.xCord + deltaX,
      yCord: originPos.current.yCord + deltaY,
    };
    onPositionChange(entry, newPos);
  };

  const handleMouseUp = () => {
    if (dragging) {
      setDragging(false);
    }
  };

  useEffect(() => {
    if (dragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [dragging]);

  return (
    <div
      onMouseDown={handleMouseDown}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'absolute',
        left: entry.position.xCord,
        top: entry.position.yCord,
        borderTop: hovered ? `6px solid ${entry.color}` : 'none',
        borderRight: hovered ? `6px solid ${entry.color}` : 'none',
        borderBottom: `6px solid ${entry.color}`,
        borderLeft: hovered ? `6px solid ${entry.color}` : 'none',
        padding: hovered ? '8px': '0px',
        transition: 'border-color 0.2s ease-in-out, background-color 0.2s ease-in-out',
        background: hovered ? '#fff' : 'transparent',
        pointerEvents: dragging ? 'none' : 'auto',
      }}
    >
      <div
        style={{
          cursor: 'grab',
          fontFamily: 'Bangers',
          fontSize: '1.5rem',
          letterSpacing: '0.04em',
          fontWeight: 'bold',
          userSelect: 'none',
          textAlign: 'center',
        }}
      >
        {displayLabel}
      </div>
      {hovered && children}
    </div>
  );
}; */
import React, { useState, useRef, useEffect, useLayoutEffect } from 'react';
import { ContainerEntry, Position } from '../model/EntriesGeneralFeatures';

interface EntryProps {
  entry: ContainerEntry;
  children: React.ReactNode;
  onPositionChange: (entry: ContainerEntry, newPos: Position) => void;
  onSizeChange?: (entry: ContainerEntry, newSize: { width: number; height: number }) => void;
}

export const Entry: React.FC<EntryProps> = ({ entry, children, onPositionChange, onSizeChange }) => {
  const [dragging, setDragging] = useState(false);
  const [resizing, setResizing] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [scaleFactor, setScaleFactor] = useState(1);
  const originMouse = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const originPos = useRef<Position>({ xCord: 0, yCord: 0 });
  const originScale = useRef<number>(1);
  const entryRef = useRef<HTMLDivElement | null>(null);

  const displayLabel = entry.type;

  const handleMouseDown = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).classList.contains('resize-handle')) {
      originMouse.current = { x: e.clientX, y: e.clientY };
      originScale.current = scaleFactor;
      setResizing(true);
    } else {
      if (!resizing) setHovered(false);
      e.preventDefault();
      originMouse.current = { x: e.clientX, y: e.clientY };
      originPos.current = { ...entry.position };
      setDragging(true);
    }
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (dragging) {
      const deltaX = e.clientX - originMouse.current.x;
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
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => !resizing && setHovered(false)}
      style={{
        position: 'absolute',
        left: entry.position.xCord,
        top: entry.position.yCord,
        zIndex: hovered ? 999 : 'auto',
        borderTop: hovered ? `6px solid ${entry.color}` : 'none',
        borderRight: hovered ? `6px solid ${entry.color}` : 'none',
        borderBottom: `6px solid ${entry.color}`,
        borderLeft: hovered ? `6px solid ${entry.color}` : 'none',
        padding: hovered ? `${8 * scaleFactor}px` : '0px',
        transition: 'border-color 0.2s ease-in-out, background-color 0.2s ease-in-out',
        background: hovered ? '#fff' : 'transparent',
        pointerEvents: dragging || resizing ? 'none' : 'auto',
        boxSizing: 'border-box',
        display: 'inline-block',
        transform: `scale(${scaleFactor})`,
        transformOrigin: 'top left',
      }}
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











