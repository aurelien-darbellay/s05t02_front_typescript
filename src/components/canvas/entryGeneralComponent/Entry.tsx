// --- Entry.tsx ---
import React, { useRef, forwardRef, useContext, useEffect } from 'react';
import { ContainerEntry } from '../../../model/EntriesGeneralFeatures';
import { getEntryStyle } from './entryStyle';
import { EditEntryContext } from '../../../contexts/EditEntryContext';
import ProjectionToggler from '../../editDocumentRoute/ProjectionToggler';
import { CSSTransition } from 'react-transition-group';
import './EntryTransitions.css';

import { useEntryHover } from './useEntryHover';
import { useEntryInteractions } from './useEntryInteractions';

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
    const entryRef = useRef<HTMLDivElement | null>(null);
    const transitionRef = useRef<HTMLDivElement>(null);

    const {
      dialogOpen,
      connectMode,
      connectOriginId,
      setConnectOriginId,
      setConnectMode,
      addConnection,
      determineIfList,
      handleEditEntry,
      updatePosition,
      addOrUpdateEntry,
    } = useContext(EditEntryContext);

    // Use hover hook
    const { hovered, setHovered, handleMouseEnter, handleMouseLeave } =
      useEntryHover({
        entry,
        entryRef,
        dialogOpen,
        existOpenEntry,
        connectMode,
        setExistOpenEntry,
        onHoverHeightChange,
      });

    // Use drag/resizing hook
    const { dragging, resizing, scaleFactor, handleMouseDown } =
      useEntryInteractions({
        entry,
        updatePosition,
        width,
        setHovered,
        setExistOpenEntry,
        addOrUpdateEntry,
      });

    // Resize observer for notifying parent
    const lastSize = useRef<{ width: number; height: number } | null>(null);

    const hasPicture =
      entry.type === 'PROFILE_PICTURE' &&
      entry.documentCloudMetadata &&
      entry.documentCloudMetadata.publicUrl &&
      entry.documentCloudMetadata.publicUrl != '';

    useEffect(() => {
      if (!entryRef.current || !onSizeChange) return;

      const observer = new ResizeObserver((entries) => {
        for (const entry of entries) {
          const { width, height } = entry.contentRect;

          // Only trigger onSizeChange if size really changed
          if (
            !lastSize.current ||
            lastSize.current.width !== width ||
            lastSize.current.height !== height
          ) {
            lastSize.current = { width, height };
            onSizeChange();
          }
        }
      });

      observer.observe(entryRef.current);
      return () => observer.disconnect();
    }, [entryRef.current, onSizeChange]);

    const displayLabel = entry.displayedType;

    // Click (context menu) handler for editing
    const handleClick = (e: React.MouseEvent) => {
      e.preventDefault();
      determineIfList(entry.type);
      handleEditEntry(entry);
    };

    return (
      <div
        ref={(node) => {
          entryRef.current = node;
          if (ref) {
            if (typeof ref === 'function') ref(node);
            else ref.current = node;
          }
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseDown={(e) => {
          if ((e.target as HTMLElement).closest('a')) return;
          if (connectMode) {
            e.preventDefault();
            e.stopPropagation();
            if (!connectOriginId) setConnectOriginId(entry.id);
            else if (connectOriginId !== entry.id) {
              addConnection(connectOriginId, entry.id);
              setConnectOriginId(null);
              //setConnectMode(false);
            }
          } else {
            handleMouseDown(e);
          }
        }}
        onMouseUp={(e) => e.stopPropagation()}
        onContextMenu={handleClick}
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
            fontFamily: 'Poppins',
            fontSize: `1.5rem`,
            letterSpacing: '0.02em',
            fontWeight: 'bold',
            userSelect: 'none',
            textAlign: 'center',
            marginBottom: hovered ? 0 : '-5px',
          }}
        >
          {(!hovered || !hasPicture) && displayLabel.toUpperCase()}
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
