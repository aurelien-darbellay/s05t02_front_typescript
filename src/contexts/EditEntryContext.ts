import React from 'react';
import { Entry } from '../model/EntriesGeneralFeatures';

export const EditEntryContext = React.createContext<{
  handleAddEntry: ((entry: Entry, isEditing: boolean) => void) | null;
  handleEditEntry: ((entry: Entry) => void) | null;
  isList: boolean;
  setIsList: React.Dispatch<React.SetStateAction<boolean>>;
  isListItem: boolean;
  setIsListItem: React.Dispatch<React.SetStateAction<boolean>>;
  determineIfList: (type: string) => boolean;
}>({
  handleAddEntry: null,
  handleEditEntry: null,
  isList: false,
  setIsList: () => {},
  isListItem: false,
  setIsListItem: () => {},
  determineIfList: () => false,
});
