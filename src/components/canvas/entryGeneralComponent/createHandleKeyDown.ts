import { ContainerEntry, Entry } from '../../../model/EntriesGeneralFeatures';

export function createHandleKeyDown({
  selectedConnectionIndex,
  setSelectedConnectionIndex,
  connections,
  entries,
  setEntries,
  addOrUpdateEntry,
}: {
  selectedConnectionIndex: number | null;
  setSelectedConnectionIndex: React.Dispatch<
    React.SetStateAction<number | null>
  >;
  connections: {
    sourceId: string;
    targetId: string;
    from: { x: number; y: number } | null;
    to: { x: number; y: number } | null;
  }[];
  entries: ContainerEntry[];
  setEntries: React.Dispatch<React.SetStateAction<ContainerEntry[]>>;
  addOrUpdateEntry: (entry: Entry, isEditing: boolean) => void;
}) {
  return function handleKeyDown(e: KeyboardEvent) {
    if (e.key === 'Delete' && selectedConnectionIndex !== null) {
      const connToDelete = connections[selectedConnectionIndex];
      if (!connToDelete) return;

      const { sourceId, targetId } = connToDelete;

      let updatedSource = null;
      let updatedTarget = null;
      setEntries((prev) =>
        prev.map((entry) => {
          if (entry.id === sourceId) {
            updatedSource = { ...entry, nextEntry: null };
            return { ...entry, nextEntry: null };
          }
          if (entry.id === targetId) {
            updatedTarget = { ...entry, previousEntry: null };
            return { ...entry, previousEntry: null };
          }
          return entry;
        })
      );
      if (updatedSource) addOrUpdateEntry(updatedSource, true);
      if (updatedTarget) addOrUpdateEntry(updatedTarget, true);
      setSelectedConnectionIndex(null);
    }
  };
}
