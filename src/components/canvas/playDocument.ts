import { ContainerEntry } from '../../model/EntriesGeneralFeatures';
import { PlaybackController } from './PlaybackController';
import { getEntryReferenceNumberForPlayback } from './getEntryReferenceNumberForPlayback';

export async function playDocument(
  entries: ContainerEntry[],
  setEntries: React.Dispatch<React.SetStateAction<ContainerEntry[]>>,
  setUserUpdate: React.Dispatch<React.SetStateAction<boolean>>,
  setUserUpdateMessage: React.Dispatch<React.SetStateAction<string>>,
  controller: PlaybackController
) {
  if (!entries || entries.length === 0) {
    setUserUpdate(true);
    setUserUpdateMessage('No entries to play.');
    return;
  }

  if (controller.shouldStop) {
    setUserUpdate(true);
    setUserUpdateMessage('Playback stopped.');
    return;
  }

  // 1️⃣ Find start and end
  const startEntries = entries.filter((e) => !e.previousEntry);
  const endEntries = entries.filter((e) => !e.nextEntry);

  if (startEntries.length !== 1 || endEntries.length !== 1) {
    setUserUpdate(true);
    setUserUpdateMessage(
      'Document must have exactly one start and one end entry.'
    );
    return;
  }

  const start = startEntries[0];

  // 2️⃣ Traverse and build path
  const ordered: ContainerEntry[] = [];
  const visited = new Set<string>();
  let current: ContainerEntry | undefined = start;

  while (current) {
    if (!current.id || visited.has(current.id)) {
      setUserUpdate(true);
      setUserUpdateMessage('Document graph is invalid (cycle or missing id).');
      return;
    }

    ordered.push(current);
    visited.add(current.id);

    if (!current.nextEntry) break;
    current = entries.find((e) => e.id === current?.nextEntry);
    if (!current) {
      setUserUpdate(true);
      setUserUpdateMessage('Document graph is broken (missing linked entry).');
      return;
    }
  }

  if (ordered.length !== entries.length) {
    setUserUpdate(true);
    setUserUpdateMessage(
      'Document graph is incomplete (some entries are disconnected).'
    );
    return;
  }

  // 3️⃣ Play in order
  for (const entry of ordered) {
    //console.log(entry.type);
    // Mark only this entry as opened
    if (controller.shouldStop) {
      setUserUpdate(true);
      setUserUpdateMessage('Playback stopped.');
      return;
    }

    setEntries((prev) =>
      prev.map((e) =>
        e.id === entry.id
          ? { ...e, highlighted: true }
          : { ...e, highlighted: false }
      )
    );

    // Determine if it's a list type

    const delay = Math.max(
      1800,
      33 * getEntryReferenceNumberForPlayback(entry) + 200
    );

    //console.log(delay);
    await new Promise((resolve) => setTimeout(resolve, delay));
  }

  // 4️⃣ Clear all opened
  setEntries((prev) => prev.map((e) => ({ ...e, highlighted: false })));

  setUserUpdate(true);
  setUserUpdateMessage('Playback complete!');
}
