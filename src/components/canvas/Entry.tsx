// --- Entry.tsx ---

import React, {
  useState,
  useRef,
  useEffect,
  useLayoutEffect,
  useContext,
  forwardRef,
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

// 👇 Here's the key: forwardRef lets us accept the parent's ref
export const Entry = forwardRef<HTMLDivElement, EntryProps>(
  (
    {
      entry,
      children,
      onSizeChange,
      width,
      existOpenEntry,
      setExistOpenEntry,
      editable,
    },
    ref
  ) => {
    const [dragging, setDragging] = useState(false);
    const [resizing, setResizing] = useState(false);
    const [hovered, setHovered] = useState(false);
    const [scaleFactor, setScaleFactor] = useState(1);
    const originMouse = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
    const originPos = useRef<Position>({ xCord: 0, yCord: 0 });
    const originScale = useRef<number>(1);

    // ✅ Local ref for interactions
    const entryRef = useRef<HTMLDivElement | null>(null);

    const displayLabel = entry.displayedType;
    const {
      determineIfList,
      handleEditEntry,
      updatePosition,
      dialogOpen,
      connectMode,
      connectOriginId,
      setConnectOriginId,
      setConnectMode,
      addConnection,
    } = useContext(EditEntryContext);

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

    const handleSwitchMouseDown = (e: React.MouseEvent) => {
      if (connectMode) {
        e.preventDefault();
        e.stopPropagation();
        if (!connectOriginId) {
          if (setConnectOriginId) setConnectOriginId(entry.id);
        } else if (connectOriginId && connectOriginId !== entry.id) {
          if (addConnection) addConnection(connectOriginId, entry.id);
          if (setConnectOriginId) setConnectOriginId(null);
          if (setConnectMode) setConnectMode(false);
        }
      } else {
        handleMouseDown(e);
      }
    };

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

    const handleSwitchMouseMove = connectMode ? undefined : handleMouseMove;
    const handleSwitchMouseUp = connectMode ? undefined : handleMouseUp;

    useEffect(() => {
      if (dragging || resizing) {
        document.addEventListener('mousemove', handleSwitchMouseMove);
        document.addEventListener('mouseup', handleSwitchMouseUp);
        return () => {
          document.removeEventListener('mousemove', handleSwitchMouseMove);
          document.removeEventListener('mouseup', handleSwitchMouseUp);
        };
      }
    }, [dragging, resizing]);

    useEffect(() => {
      setHovered(entry.highlighted);
    }, [entry.highlighted]);

    useLayoutEffect(() => {
      //console.log(hovered);
      if (entryRef.current && onSizeChange) {
        const rect = entryRef.current.getBoundingClientRect();
        onSizeChange(entry, { width: rect.width, height: rect.height });
      }
    }, [hovered, children, scaleFactor]);

    useEffect(() => {
      if (dialogOpen) setHovered(false);
    }, [dialogOpen]);

    // 👇 Bridge the internal ref to the external one
    useEffect(() => {
      if (!ref) return;
      if (typeof ref === 'function') {
        ref(entryRef.current);
      } else {
        ref.current = entryRef.current;
      }
    }, [entryRef.current, ref]);

    return (
      <div
        ref={entryRef}
        onMouseDown={(e) => handleSwitchMouseDown(e)}
        onMouseUp={handleSwitchMouseUp}
        onContextMenu={handleClick}
        onMouseEnter={() => {
          if (!dialogOpen && !existOpenEntry && !connectMode) {
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
        {hovered && editable && (
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
          <ProjectionToggler entry={entry} marginTop={5} size={35} />
        )}
      </div>
    );
  }
);

Entry.displayName = 'Entry';
