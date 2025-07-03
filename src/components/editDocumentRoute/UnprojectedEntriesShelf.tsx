import { ProjectionContext } from '../../contexts/ProjectionContext';
import { EntryListTypes } from '../../model/EntriesConfig';
import {
  ContainerEntry,
  Entry,
  ListEntries,
} from '../../model/EntriesGeneralFeatures';
import ShelvedEntry from './ShelvedEntry';

interface UnprojectedEntriesShelfProps {
  entries: ContainerEntry[];
}

export const UnprojectedEntriesShelf: React.FC<
  UnprojectedEntriesShelfProps
> = ({ entries }) => {
  const getListItemsToShelve = (entry: ContainerEntry): Entry[] => {
    if (entry.projected && EntryListTypes.includes(entry.type))
      return (entry as ListEntries).entries.filter((item) => !item.projected);
    return [];
  };
  const containerEntriesToShelve = entries.filter((entry) => !entry.projected);
  const numContEntriesToShelve = containerEntriesToShelve.length;
  const listItemToShelve = entries.reduce(
    (a, b) => a.concat(getListItemsToShelve(b)),
    [] as Entry[]
  );

  return (
    <ProjectionContext.Provider value={{ projected: false }}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 6,
          width: '100%',
          alignItems: 'flex-start',
        }}
      >
        {containerEntriesToShelve.map((entry, idx) => (
          <ShelvedEntry entry={entry} key={idx} />
        ))}
        {listItemToShelve.map((entry, idx) => (
          <ShelvedEntry entry={entry} key={idx + numContEntriesToShelve} />
        ))}
      </div>
    </ProjectionContext.Provider>
  );
};
