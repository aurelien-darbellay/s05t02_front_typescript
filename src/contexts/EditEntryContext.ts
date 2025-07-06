import React from 'react';
import {
  ContainerEntry,
  Entry,
  Position,
} from '../model/EntriesGeneralFeatures';

export const EditEntryContext = React.createContext<{
  addOrUpdateEntry: ((entry: Entry, isEditing: boolean) => void) | null;
  handleEditEntry: ((entry: Entry) => void) | null;
  updatePosition: ((entry: ContainerEntry, newPos: Position) => void) | null;
  dialogOpen: boolean;
  isList: boolean;
  setIsList: React.Dispatch<React.SetStateAction<boolean>>;
  isListItem: boolean;
  setIsListItem: React.Dispatch<React.SetStateAction<boolean>>;
  determineIfList: (type: string) => boolean;
  editable: boolean;
  setUpdateUser: React.Dispatch<React.SetStateAction<boolean>>;
  setUpdateUserMessage: React.Dispatch<React.SetStateAction<string>>;
}>({
  addOrUpdateEntry: null,
  handleEditEntry: null,
  updatePosition: null,
  dialogOpen: false,
  isList: false,
  setIsList: () => {},
  isListItem: false,
  setIsListItem: () => {},
  determineIfList: () => false,
  editable: false,
  setUpdateUser: () => {},
  setUpdateUserMessage: () => {},
});
