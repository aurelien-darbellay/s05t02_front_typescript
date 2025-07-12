// src/components/canvas/getEntryStyle.ts

import { Shape } from '../../model/concreteEntries/ProfilePicture';
import { ContainerEntry } from '../../model/EntriesGeneralFeatures';

export const getEntryStyle = (
  entry: ContainerEntry,
  hovered: boolean,
  dragging: boolean,
  resizing: boolean,
  scaleFactor: number,
  width: number
): React.CSSProperties => {
  const hasPicture = Boolean(
    entry.type === 'PROFILE_PICTURE' &&
      entry.documentCloudMetadata &&
      entry.documentCloudMetadata.publicUrl &&
      entry.documentCloudMetadata.publicUrl.trim() !== ''
  );

  const baseColor = entry.color ?? '#ccc';

  return {
    position: 'absolute',
    left: entry.position.xCord * width,
    top: entry.position.yCord,
    zIndex: hovered ? 999 : 'auto',

    borderTopStyle: 'solid',
    borderTopWidth: '6px',
    borderTopColor: hovered && !hasPicture ? baseColor : 'transparent',

    borderRightStyle: 'solid',
    borderRightWidth: '6px',
    borderRightColor: hovered && !hasPicture ? baseColor : 'transparent',

    borderBottomStyle: 'solid',
    borderBottomWidth: '6px',
    borderBottomColor: hovered && hasPicture ? 'transparent' : baseColor,

    borderLeftStyle: 'solid',
    borderLeftWidth: '6px',
    borderLeftColor: hovered && !hasPicture ? baseColor : 'transparent',

    padding: hovered ? `${8 * scaleFactor}px` : 0,

    background: hovered ? (hasPicture ? 'transparent' : '#fff') : 'transparent',

    pointerEvents: dragging || resizing ? 'none' : 'auto',
    boxSizing: 'border-box',
    display: 'inline-block',
    transform: `scale(${scaleFactor})`,
    transformOrigin: 'top left',
    cursor: 'grab',
    maxWidth: '20em',
    transition: `
      padding 300ms ease,
      border-color 300ms ease,
      background 300ms ease
    `,
  };
};

export const getShapeStyle = (shape: Shape): React.CSSProperties => {
  switch (shape) {
    case Shape.SQUARE:
      return {
        clipPath: 'inset(0%)',
      };
    case Shape.ROUND:
      return {
        clipPath: 'circle(50% at 50% 50%)',
        objectFit: 'cover',
      };
    case Shape.RECTANGLE:
      return {
        clipPath: 'inset(0%)',
        width: '300px',
        height: '200px',
        objectFit: 'cover',
      };
    case Shape.STAR:
      return {
        clipPath:
          'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)',
      };
    case Shape.MATCH:
      return {}; // No clipPath at all
    default:
      return {};
  }
};
