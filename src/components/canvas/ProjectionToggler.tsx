import { useContext } from 'react';
import { EyeOff } from 'lucide-react';
import { EditEntryContext } from '../../contexts/EditEntryContext';

const ProjectionToggler = ({ entry, marginTop = 0, size = 20 }) => {
  const { handleAddEntry } = useContext(EditEntryContext);

  const handleClick = (e) => {
    e.stopPropagation();

    const updatedEntry = { ...entry, projected: false };
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
          padding: 4,
          cursor: 'pointer',
        }}
      >
        <EyeOff size={size} />
      </button>
    </div>
  );
};

export default ProjectionToggler;
