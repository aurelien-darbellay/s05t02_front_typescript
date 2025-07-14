import { ContainerEntry, Entry } from '../../../model/EntriesGeneralFeatures';

export function createHandleKeyDown({
  selectedConnectionIndex,
  setSelectedConnectionIndex,
  connections,
  setEntries,
  addOrUpdateEntry,
}: {
  selectedConnectionIndex: number | null;
  setSelectedConnectionIndex: React.Dispatch<
    React.SetStateAction<number | null>
  >;
  connections: {
    sourceId: string | null;
    targetId: string | null;
    from: { x: number; y: number } | null;
    to: { x: number; y: number } | null;
  }[];
  setEntries: React.Dispatch<React.SetStateAction<ContainerEntry[]>> | null;
  addOrUpdateEntry: ((entry: Entry, isEditing: boolean) => void) | null;
}) {
  return function handleKeyDown(e: KeyboardEvent) {
    if (e.key === 'Delete' && selectedConnectionIndex !== null) {
      const connToDelete = connections[selectedConnectionIndex];
      if (!connToDelete) return;

      const { sourceId, targetId } = connToDelete;

      let updatedSource: any = null;
      let updatedTarget: any = null;
      if (setEntries)
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
