// src/components/canvas/getEntryStyle.ts

import { ContainerEntry } from '../../model/EntriesGeneralFeatures';

export const getEntryStyle = (
  entry: ContainerEntry,
  hovered: boolean,
  dragging: boolean,
  resizing: boolean,
  scaleFactor: number,
  width: number
): React.CSSProperties => ({
  position: 'absolute',
  left: entry.position.xCord * width,
  top: entry.position.yCord,
  zIndex: hovered ? 999 : 'auto',

  borderTopStyle: 'solid',
  borderTopWidth: '6px',
  borderTopColor: hovered ? (entry.color ?? '#ccc') : 'transparent',

  borderRightStyle: 'solid',
  borderRightWidth: '6px',
  borderRightColor: hovered ? (entry.color ?? '#ccc') : 'transparent',

  borderBottomStyle: 'solid',
  borderBottomWidth: '6px',
  borderBottomColor: entry.color ?? '#ccc',

  borderLeftStyle: 'solid',
  borderLeftWidth: '6px',
  borderLeftColor: hovered ? (entry.color ?? '#ccc') : 'transparent',

  padding: hovered ? `${8 * scaleFactor}px` : 0,

  background: hovered ? '#fff' : 'transparent',
  pointerEvents: dragging || resizing ? 'none' : 'auto',
  boxSizing: 'border-box',
  display: 'inline-block',
  transform: `scale(${scaleFactor})`,
  transformOrigin: 'top left',
});
