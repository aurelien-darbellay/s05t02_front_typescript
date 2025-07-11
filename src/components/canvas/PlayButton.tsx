import React, { useRef, useState, useContext, useEffect } from 'react';
import { Play } from 'lucide-react';
import { EditEntryContext } from '../../contexts/EditEntryContext';
import {
  createHandleMouseDown,
  createHandleMouseMove,
} from './entryInteractionHandlers';
import { Position } from '../../model/EntriesGeneralFeatures';

export const PlayButton: React.FC = () => {
  const [position, setPosition] = useState<Position>({
    xCord: 0.1,
    yCord: 100,
  });
  const [dragging, setDragging] = useState(false);

  const originMouse = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const originPos = useRef<Position>({ xCord: 0, yCord: 0 });
  const originScale = useRef<number>(1);

  const {
    entries,
    setEntries,
    playDocument,
    setUpdateUser,
    setUpdateUserMessage,
  } = useContext(EditEntryContext);

  const handleMouseDown = createHandleMouseDown(
    { id: 'PLAY_BUTTON', position },
    setDragging,
    () => {},
    originMouse,
    originPos,
    originScale,
    1,
    () => {}
  );

  const handleMouseMove = createHandleMouseMove(
    { id: 'PLAY_BUTTON', position },
    () => {},
    () => {},
    dragging,
    false,
    (_entry, newPos) => setPosition(newPos),
    window.innerWidth,
    originMouse,
    originPos,
    originScale,
    () => {}
  );

  useEffect(() => {
    if (dragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', () => setDragging(false));
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', () => setDragging(false));
      };
    }
  }, [dragging]);

  const handleClick = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (
      playDocument &&
      entries &&
      setEntries &&
      setUpdateUser &&
      setUpdateUserMessage
    ) {
      await playDocument(
        entries,
        setEntries,
        setUpdateUser,
        setUpdateUserMessage
      );
    }
  };

  return (
    <div
      onMouseDown={handleMouseDown}
      onClick={handleClick}
      style={{
        position: 'absolute',
        left: `${position.xCord * window.innerWidth}px`,
        top: `${position.yCord}px`,
        cursor: 'grab',
        userSelect: 'none',
        zIndex: 9999,
      }}
    >
      <Play size={40} color="green" />
    </div>
  );
};
