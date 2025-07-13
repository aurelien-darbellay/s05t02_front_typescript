import { ContainerEntry } from '../../model/EntriesGeneralFeatures';

export function isTotallyOrdered(entries: ContainerEntry[]): boolean {
  if (entries.length === 0) return true;

  // 1️⃣ Find start and end nodes
  const starts = entries.filter((e) => !e.previousEntry);
  const ends = entries.filter((e) => !e.nextEntry);
  //console.log(starts);
  //console.log(ends);

  if (starts.length !== 1 || ends.length !== 1) {
    return false;
  }

  const start = starts[0];

  // 2️⃣ Traverse from start
  const visited = new Set<string>();
  let current: ContainerEntry | undefined = start;

  while (current) {
    if (!current.id || visited.has(current.id)) {
      // Cycle or duplicate
      return false;
    }

    visited.add(current.id);

    if (!current.nextEntry) {
      break;
    }

    current = entries.find((e) => e.id === current.nextEntry);

    if (!current) {
      // Broken link
      return false;
    }
  }
  // 3️⃣ Check if all entries were visited
  return visited.size === entries.length;
}
