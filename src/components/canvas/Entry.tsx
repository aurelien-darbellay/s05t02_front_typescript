// --- Entry.tsx ---

import React, {
  useState,
  useRef,
  useEffect,
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
import { CSSTransition } from 'react-transition-group';
import './EntryTransitions.css';

interface EntryProps {
  entry: ContainerEntry;
  children: React.ReactNode;
  onSizeChange?: () => void;
  width: number;
  existOpenEntry: boolean;
  setExistOpenEntry: React.Dispatch<React.SetStateAction<boolean>>;
  editable: boolean;
  onHoverHeightChange?: (id: string, height: number) => void;
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
      onHoverHeightChange,
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
    const transitionRef = useRef<HTMLDivElement>(null);

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

    useEffect(() => {
      if (!entryRef.current || !onSizeChange) return;

      const observer = new ResizeObserver(() => {
        onSizeChange();
      });

      observer.observe(entryRef.current);

      return () => {
        observer.disconnect();
      };
    }, [entryRef.current, onSizeChange]);

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

    // Replace this part of your Entry.tsx useEffect:

    useEffect(() => {
      if (hovered && entryRef.current) {
        const el = entryRef.current;
        const rect = el.getBoundingClientRect();

        // Call this immediately so Canvas can resize
        if (onHoverHeightChange) {
          onHoverHeightChange(entry.id, rect.height);
        }

        // Wait for next frame (layout update) before scrolling
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            const buffer = 20;
            const updatedRect = el.getBoundingClientRect();
            const isFullyVisible =
              updatedRect.top >= buffer &&
              updatedRect.bottom <= window.innerHeight - buffer;

            if (!isFullyVisible) {
              el.scrollIntoView({
                behavior: 'smooth',
                block: 'nearest',
                inline: 'nearest',
              });
            }
          });
        });
      }
    }, [hovered]);

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
        <CSSTransition
          in={hovered}
          timeout={300}
          classNames="fade"
          unmountOnExit
          nodeRef={transitionRef}
        >
          <div ref={transitionRef}>
            {children}
            {editable && (
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
            {editable && (
              <ProjectionToggler entry={entry} marginTop={5} size={35} />
            )}
          </div>
        </CSSTransition>
      </div>
    );
  }
);

Entry.displayName = 'Entry';
