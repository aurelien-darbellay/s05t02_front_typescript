import { useContext, useState } from 'react';
import { EditEntryContext } from '../../../contexts/EditEntryContext';
import { Entry, ItemKeyWords } from '../../../model/EntriesGeneralFeatures';
import { ProjectionContext } from '../../../contexts/ProjectionContext';

interface ListItemKeyWordsComponentProps {
  entry: Entry;
}

export const ListItemKeyWordsComponent: React.FC<
  ListItemKeyWordsComponentProps
> = ({ entry }) => {
  const { handleEditEntry, setIsListItem } = useContext(EditEntryContext);
  const [hasShadow, setHasShadow] = useState(false);
  const { projected } = useContext(ProjectionContext);
  const capitalizeWords = (text: string) =>
    text
      .split(' ')
      .map((word) =>
        word.length > 0
          ? word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
          : ''
      )
      .join(' ');

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    //console.log('holo');
    setHasShadow(false);
    setIsListItem(true);
    if (handleEditEntry && projected) handleEditEntry(entry);
  };

  const handleMouseEnter = () => {
    setHasShadow(true);
  };

  const handleMouseLeave = () => {
    setHasShadow(false);
  };

  return (
    <span
      onContextMenu={handleContextMenu}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        transition: 'box-shadow 0.2s ease',
        boxShadow: hasShadow ? '0 2px 6px rgba(0,0,0,0.3)' : 'none',
        padding: '3px',
        borderRadius: '4px',
        cursor: 'pointer',
        userSelect: 'none',
        position: 'relative',
        whiteSpace: 'nowrap',
      }}
    >
      {capitalizeWords((entry as ItemKeyWords).keyWords)}
    </span>
  );
};
