import React, { useState, useRef, useEffect } from 'react';
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

  // Recursively walk `nodes` until we find the first ReactElement.
  const displayLabel = entry.type; 
  const handleMouseDown = (e: React.MouseEvent) => {
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
        cursor: 'grab',
      }}
    >
      {hovered
        ? children
        : displayLabel
        ? <span>{displayLabel}</span>
        : null}
    </div>
  );
};

