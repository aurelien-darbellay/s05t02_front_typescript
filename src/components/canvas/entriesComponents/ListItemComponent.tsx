import { useContext, useState } from 'react';
import { EditEntryContext } from '../../../contexts/EditEntryContext';
import { Entry } from '../../../model/EntriesGeneralFeatures';
import ProjectionToggler from '../../editDocumentRoute/ProjectionToggler';
import { mapEntryToComponent } from '../../../model/mappers/mapEntryToComponent';
import { ProjectionContext } from '../../../contexts/ProjectionContext';

interface ListItemComponentProps {
  entry: Entry;
}

export const ListItemComponent: React.FC<ListItemComponentProps> = ({
  entry,
}) => {
  const { handleEditEntry, setIsListItem } = useContext(EditEntryContext);
  const [hasShadow, setHasShadow] = useState(false);
  const { projected } = useContext(ProjectionContext);

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
    <li
      onContextMenu={handleContextMenu}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        transition: 'box-shadow 0.2s ease',
        boxShadow: hasShadow ? '0 2px 6px rgba(0,0,0,0.3)' : 'none',
        padding: '8px',
        borderRadius: '4px',
        cursor: 'pointer',
        userSelect: 'none',
        position: 'relative',
      }}
    >
      {mapEntryToComponent(entry)}
      {!entry.projected && <ProjectionToggler entry={entry} />}
    </li>
  );
};
