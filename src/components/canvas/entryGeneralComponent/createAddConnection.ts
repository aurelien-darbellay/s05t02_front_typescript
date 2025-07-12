export const createAddConnection = (
  entries,
  setUpdateUser,
  setUpdateUserMessage,
  addOrUpdateEntry
) => {
  return (sourceId: string, targetId: string) => {
    const sourceEntry = entries.find((e) => e.id === sourceId);
    const targetEntry = entries.find((e) => e.id === targetId);
    //console.log(targetEntry);
    //console.log(sourceEntry);
    if (!sourceEntry || !targetEntry) {
      setUpdateUser(true);
      setUpdateUserMessage('Error: Could not find source or target entry.');
      return;
    }

    if (sourceEntry.nextEntry) {
      setUpdateUser(true);
      setUpdateUserMessage(
        'A single entry cannot be followed by more than one entry. Delete existing connection first.'
      );
      return;
    }

    if (targetEntry.previousEntry) {
      setUpdateUser(true);
      setUpdateUserMessage(
        'A single entry cannot be preceded by more than one entry. Delete existing connection first.'
      );
      return;
    }
    const updatedSource = { ...sourceEntry, nextEntry: targetId };
    const updatedTarget = { ...targetEntry, previousEntry: sourceId };
    if (updatedSource) addOrUpdateEntry(updatedSource);
    if (updatedTarget) addOrUpdateEntry(updatedTarget);
  };
};
