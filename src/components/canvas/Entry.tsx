// --- Entry.tsx ---
import React, {
  useState,
  useRef,
  useEffect,
  useLayoutEffect,
  useContext,
} from 'react';
import { ContainerEntry, Position } from '../../model/EntriesGeneralFeatures';
import { getEntryStyle } from './entryStyle';
import {
  createHandleMouseDown,
  createHandleMouseMove,
} from './entryInteractionHandlers';
import { EditEntryContext } from '../../contexts/EditEntryContext';
import ProjectionToggler from '../editDocumentRoute/ProjectionToggler';

interface EntryProps {
  entry: ContainerEntry;
  children: React.ReactNode;
  onSizeChange?: (
    entry: ContainerEntry,
    newSize: { width: number; height: number }
  ) => void;
  width: number;
  existOpenEntry: boolean;
  setExistOpenEntry: React.Dispatch<React.SetStateAction<boolean>>;
  editable: boolean;
}

export const Entry: React.FC<EntryProps> = ({
  entry,
  children,
  onSizeChange,
  width,
  existOpenEntry,
  setExistOpenEntry,
  editable,
}) => {
  const [dragging, setDragging] = useState(false);
  const [resizing, setResizing] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [scaleFactor, setScaleFactor] = useState(1);
  const originMouse = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const originPos = useRef<Position>({ xCord: 0, yCord: 0 });
  const originScale = useRef<number>(1);
  const entryRef = useRef<HTMLDivElement | null>(null);
  const displayLabel = entry.displayedType;
  const { determineIfList, handleEditEntry, updatePosition, dialogOpen } =
    useContext(EditEntryContext);
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

  //console.log(entry);

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

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    determineIfList(entry.type);
    if (handleEditEntry) handleEditEntry(entry);
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

  useEffect(() => {
    if (dialogOpen) setHovered(false);
  }, [dialogOpen]);

  return (
    <div
      ref={entryRef}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onContextMenu={handleClick}
      onMouseEnter={() => {
        if (!dialogOpen && !existOpenEntry) {
          setHovered(true);
          setExistOpenEntry(true);
        }
      }}
      onMouseLeave={(e) => {
        if (resizing || dragging) return;
        if (e.buttons !== 0) return;
        setHovered(false);
        setExistOpenEntry(false);
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
      {hovered && editable && (
        <ProjectionToggler
          entry={entry}
          marginTop={5}
          size={35}
          editable={editable}
        />
      )}
    </div>
  );
};
