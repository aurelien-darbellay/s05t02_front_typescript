import { useContext } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { EditEntryContext } from '../../contexts/EditEntryContext';
import { ListEntries } from '../../model/EntriesGeneralFeatures';
import { EntryListTypes } from '../../model/EntriesConfig';

const ProjectionToggler = ({ entry, marginTop = 0, size = 20 }) => {
  const { handleAddEntry } = useContext(EditEntryContext);

  const ensureConsistentProjectionInListEntries = (
    entry: ListEntries
  ): ListEntries => {
    const consistentEntry = ListEntries.from(entry);
    if (!consistentEntry.projected) {
      console.log('List not projected');
      consistentEntry.entries = consistentEntry.entries.map((item) => ({
        ...item,
        projected: true,
      }));
    }
    return consistentEntry;
  };
  const handleClick = (e) => {
    e.stopPropagation();

    const updatedEntry = { ...entry, projected: !entry.projected };
    //console.log(updatedEntry);
    const consistentEntry = EntryListTypes.includes(entry.type)
      ? ensureConsistentProjectionInListEntries(updatedEntry)
      : updatedEntry;
    console.log(consistentEntry);
    if (handleAddEntry) {
      handleAddEntry(consistentEntry, true);
    }
  };

  return (
    <div style={{ marginTop }}>
      <button
        className="toggler active:text-pink-500"
        onClick={handleClick}
        style={{
          background: 'none',
          border: 'none',
          padding: 6,
          cursor: 'pointer',
        }}
      >
        {entry.projected ? (
          <EyeOff className="toggler" size={size} />
        ) : (
          <Eye className="toggler" size={size} />
        )}
      </button>
    </div>
  );
};

export default ProjectionToggler;
