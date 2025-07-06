import { useContext, MouseEvent } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { EditEntryContext } from '../../contexts/EditEntryContext';
import { Entry, ListEntries } from '../../model/EntriesGeneralFeatures';
import { EntryListTypes } from '../../model/EntriesConfig';
import { ActionButton } from '../../utils/ActionButton';
import { normalizeEntryData } from './entryCreation/normalizeEntryData';

interface ProjectionTogglerProps {
  entry: any;
  marginTop?: number;
  size?: number;
  onClick?: () => void;
}

const ProjectionToggler: React.FC<ProjectionTogglerProps> = ({
  entry,
  marginTop = 0,
  size = 20,
  onClick,
}) => {
  const { addOrUpdateEntry, dialogOpen, isListItem, editable } =
    useContext(EditEntryContext);

  const ensureConsistentProjectionInListEntries = (
    entry: ListEntries
  ): ListEntries => {
    const consistentEntry = ListEntries.from(entry);
    if (!consistentEntry.projected) {
      consistentEntry.entries = consistentEntry.entries.map((item) => ({
        ...item,
        projected: true,
      }));
    }
    return consistentEntry;
  };

  const handleClick = (e: MouseEvent<HTMLButtonElement | HTMLDivElement>) => {
    e.stopPropagation();
    if (!editable) return;
    console.log(editable);
    const updatedEntry = { ...entry, projected: !entry.projected };
    const consistentEntry = EntryListTypes.includes(entry.type)
      ? ensureConsistentProjectionInListEntries(updatedEntry)
      : updatedEntry;

    if (addOrUpdateEntry) {
      addOrUpdateEntry(
        normalizeEntryData(consistentEntry as Record<string, any>) as Entry,
        true
      );
    }
  };

  const handleActionButtonClick = (e: MouseEvent<HTMLButtonElement>) => {
    handleClick(e);
    if (onClick) onClick();
  };

  return (
    <div style={{ marginTop }}>
      {dialogOpen && isListItem ? (
        <ActionButton
          onClick={handleActionButtonClick}
          value="Hide"
          color="lightgrey"
          disabled={!editable}
        />
      ) : (
        <button
          className="target active:text-pink-500"
          onClick={handleClick}
          style={{
            background: 'none',
            border: 'none',
            padding: 6,
            cursor: 'pointer',
          }}
        >
          {entry.projected ? (
            <EyeOff
              className={`target ${editable ? '' : 'opacity-0'}`}
              size={size}
            />
          ) : (
            <Eye
              className={`target ${editable ? '' : 'opacity-0'}`}
              size={size}
            />
          )}
        </button>
      )}
    </div>
  );
};

export default ProjectionToggler;
