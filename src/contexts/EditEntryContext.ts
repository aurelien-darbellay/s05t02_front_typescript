import React from 'react';
import { Entry } from '../model/EntriesGeneralFeatures';

export const EditEntryContext = React.createContext<{
  handleEditEntry: ((entry: Entry) => void) | null;
}>({
  handleEditEntry: null,
});
