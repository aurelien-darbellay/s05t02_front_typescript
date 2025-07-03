import React from 'react';
import {
  ContainerEntry,
  Entry,
  Position,
} from '../model/EntriesGeneralFeatures';

export const EditEntryContext = React.createContext<{
  handleAddEntry: ((entry: Entry, isEditing: boolean) => void) | null;
  handleEditEntry: ((entry: Entry) => void) | null;
  updatePosition: ((entry: ContainerEntry, newPos: Position) => void) | null;
  dialogOpen: boolean;
  isList: boolean;
  setIsList: React.Dispatch<React.SetStateAction<boolean>>;
  isListItem: boolean;
  setIsListItem: React.Dispatch<React.SetStateAction<boolean>>;
  determineIfList: (type: string) => boolean;
}>({
  handleAddEntry: null,
  handleEditEntry: null,
  updatePosition: null,
  dialogOpen: false,
  isList: false,
  setIsList: () => {},
  isListItem: false,
  setIsListItem: () => {},
  determineIfList: () => false,
});
