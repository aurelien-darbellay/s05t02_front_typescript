import React from 'react';
import {
  ContainerEntry,
  Entry,
  Position,
} from '../model/EntriesGeneralFeatures';
import { playDocument } from '../components/canvas/playDocument';

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
  connectMode: boolean;
  setConnectMode: React.Dispatch<React.SetStateAction<boolean>> | null;
  connectOriginId: string | null;
  entries: ContainerEntry[];
  setEntries: React.Dispatch<React.SetStateAction<ContainerEntry[]>>;
  setConnectOriginId: React.Dispatch<
    React.SetStateAction<string | null>
  > | null;
  addConnection:
    | ((sourceId: string | null, targetId: string | null) => void)
    | null;
  playDocument: (
    entries: ContainerEntry[],
    setEntries: React.Dispatch<React.SetStateAction<ContainerEntry[]>>,
    setUserUpdate: React.Dispatch<React.SetStateAction<boolean>>,
    setUserUpdateMessage: React.Dispatch<React.SetStateAction<string>>
  ) => Promise<void>;
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
  connectMode: false,
  setConnectMode: null,
  connectOriginId: null,
  setConnectOriginId: null,
  addConnection: null,
  entries: [],
  setEntries: () => {},
  playDocument,
});
