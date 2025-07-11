import { ContainerEntry } from '../../model/EntriesGeneralFeatures';

export function createHandleKeyDown({
  selectedConnectionIndex,
  setSelectedConnectionIndex,
  connections,
  entries,
  setEntries,
  entryRefs,
  canvasRef,
  computeConnectionPoints,
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
  entryRefs: React.MutableRefObject<Map<string, HTMLDivElement | null>>;
  canvasRef: React.RefObject<HTMLDivElement>;
  computeConnectionPoints: (
    entry: ContainerEntry,
    entryRefs: Map<string, HTMLDivElement | null>,
    canvasEl: HTMLDivElement | null
  ) => {
    from: { x: number; y: number } | null;
    to: { x: number; y: number } | null;
  } | null;
}) {
  return function handleKeyDown(e: KeyboardEvent) {
    if (e.key === 'Delete' && selectedConnectionIndex !== null) {
      const connToDelete = connections[selectedConnectionIndex];
      if (!connToDelete) return;

      const { sourceId, targetId } = connToDelete;

      setEntries((prev) =>
        prev.map((entry) => {
          if (entry.id === sourceId) return { ...entry, nextEntry: null };
          if (entry.id === targetId) return { ...entry, previousEntry: null };
          return entry;
        })
      );

      setSelectedConnectionIndex(null);
    }
  };
}
