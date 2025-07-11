export const createAddConnection = (
  setEntries,
  setUpdateUser,
  setUpdateUserMessage
) => {
  return (sourceId: string, targetId: string) => {
    setEntries((prevEntries) => {
      const sourceEntry = prevEntries.find((e) => e.id === sourceId);
      const targetEntry = prevEntries.find((e) => e.id === targetId);

      if (!sourceEntry || !targetEntry) {
        setUpdateUser(true);
        setUpdateUserMessage('Error: Could not find source or target entry.');
        return prevEntries;
      }

      if (sourceEntry.nextEntry) {
        setUpdateUser(true);
        setUpdateUserMessage(
          'A single entry cannot be followed by more than one entry. Delete existing connection first.'
        );
        return prevEntries;
      }

      if (targetEntry.previousEntry) {
        setUpdateUser(true);
        setUpdateUserMessage(
          'A single entry cannot be preceded by more than one entry. Delete existing connection first.'
        );
        return prevEntries;
      }

      return prevEntries.map((e) => {
        if (e.id === sourceId) return { ...e, nextEntry: targetId };
        if (e.id === targetId) return { ...e, previousEntry: sourceId };
        return e;
      });
    });
  };
};
