import { ContainerEntry } from '../../model/EntriesGeneralFeatures';
import ShelvedEntry from './ShelvedEntry';

interface UnprojectedEntriesShelfProps {
  entries: ContainerEntry[];
}

export const UnprojectedEntriesShelf: React.FC<
  UnprojectedEntriesShelfProps
> = ({ entries }) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 6,
        width: '100%',
        alignItems: 'flex-start',
      }}
    >
      {entries.map((entry, idx) =>
        !entry.projected ? <ShelvedEntry entry={entry} key={idx} /> : ''
      )}
    </div>
  );
};
