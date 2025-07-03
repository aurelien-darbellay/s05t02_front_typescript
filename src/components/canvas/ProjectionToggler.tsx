import { useContext } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { EditEntryContext } from '../../contexts/EditEntryContext';

const ProjectionToggler = ({ entry, marginTop = 0, size = 20 }) => {
  const { handleAddEntry } = useContext(EditEntryContext);

  const handleClick = (e) => {
    e.stopPropagation();

    const updatedEntry = { ...entry, projected: !entry.projected };
    console.log(updatedEntry);
    if (handleAddEntry) {
      handleAddEntry(updatedEntry, true);
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
