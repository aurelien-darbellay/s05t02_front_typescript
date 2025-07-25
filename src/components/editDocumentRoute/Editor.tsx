import { useEffect, useState } from 'react';
import {
  ContainerEntry,
  Entry,
  Position,
} from '../../model/EntriesGeneralFeatures';
import { mapDocDataToEntries } from '../../model/mappers/mapDocDataToEntries';
import { TypesConfig } from '../../model/TypesConfig';
import { Canvas } from '../canvas/Canvas';
import { UnprojectedEntriesShelf } from './UnprojectedEntriesShelf';
import {
  createAddOrUpdateEntry,
  createHandleDeleteEntry,
} from './CreateDeleteEntries';
import EntryCreateDialog from './entryCreation/EntryCreateDialog';
import { updateDocDataFromEntries } from '../../model/mappers/updateDocDataFromEntries';
import { EntryListItemTypes, EntryListTypes } from '../../model/EntriesConfig';
import { EntryTypesFormatter } from '../../model/entryTypesFormatter';
import { EditEntryContext } from '../../contexts/EditEntryContext';
import { createAddConnection } from '../canvas/entryGeneralComponent/createAddConnection';
import { playDocument } from '../canvas/playDocument';

interface EditorProps {
  docData: any;
  cfg: TypesConfig;
  setDocData: (updatedDoc: any) => void;
  dialogOpen: boolean;
  setDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setUpdateUser: React.Dispatch<React.SetStateAction<boolean>>;
  setUpdateUserMessage: React.Dispatch<React.SetStateAction<string>>;
  editable: boolean;
  connectMode: boolean;
  setConnectMode: React.Dispatch<React.SetStateAction<boolean>>;
  connectOriginId: string | null;
  setConnectOriginId: React.Dispatch<React.SetStateAction<string | null>>;
}
const Editor: React.FC<EditorProps> = ({
  docData,
  cfg,
  setDocData,
  dialogOpen,
  setDialogOpen,
  setUpdateUser,
  setUpdateUserMessage,
  editable,
  connectMode,
  setConnectMode,
  connectOriginId,
  setConnectOriginId,
}) => {
  const listEntries = mapDocDataToEntries(docData);
  //console.log(listEntries);
  const [entries, setEntries] = useState<ContainerEntry[]>(listEntries);
  const [entrySpawnPosition, setEntrySpawnPosition] = useState<{
    xCord: number;
    yCord: number;
  } | null>({ xCord: 0, yCord: 0 });
  const [entryDataInModif, setEntryDataInModif] = useState<Entry | null>(null);
  const [isList, setIsList] = useState<boolean>(false);
  const [isListItem, setIsListItem] = useState<boolean>(false);
  const determineIfList = (type: string) => {
    if (
      EntryListItemTypes.concat(EntryListTypes).includes(
        EntryTypesFormatter.fromDisplayToConstant(type)
      )
    ) {
      setIsList(true);
      return true;
    }
    setIsList(false);
    return false;
  };

  const addOrUpdateEntry = createAddOrUpdateEntry(
    docData?.id,
    setEntries,
    setUpdateUser,
    setUpdateUserMessage
  );

  const handleDeleteEntry = createHandleDeleteEntry(
    docData?.id,
    setEntries,
    setUpdateUser,
    setUpdateUserMessage,
    addOrUpdateEntry
  );

  const handleEditEntry = (entry: Entry) => {
    if (!editable) return;
    setEntryDataInModif(entry);
    setDialogOpen(true);
  };

  const updatePosition = (
    entry: ContainerEntry,
    newPos: Position
  ): ContainerEntry => {
    const updated = Object.assign(
      Object.create(Object.getPrototypeOf(entry)),
      entry,
      { position: newPos }
    );
    setEntries((prevEntries) =>
      prevEntries.map((e) => (e.type === entry.type ? updated : e))
    );
    return updated;
  };

  const addConnection = createAddConnection(
    entries,
    setUpdateUser,
    setUpdateUserMessage,
    addOrUpdateEntry
  );

  /* useEffect(() => {
    playDocument(entries, setEntries, setUpdateUser, setUpdateUserMessage);
  }, [entries]); */

  useEffect(() => {
    const newDocData = updateDocDataFromEntries(docData, entries);
    setDocData(newDocData);
  }, [entries]);

  useEffect(() => {
    setEntries(() => mapDocDataToEntries(docData));
  }, [docData]);

  return (
    <EditEntryContext.Provider
      value={{
        addOrUpdateEntry,
        handleEditEntry,
        dialogOpen,
        isList,
        setIsList,
        isListItem,
        setIsListItem,
        determineIfList,
        updatePosition,
        editable,
        setUpdateUser,
        setUpdateUserMessage,
        connectMode,
        setConnectMode,
        connectOriginId,
        setConnectOriginId,
        addConnection,
        entries,
        setEntries,
        playDocument,
        setEntryDataInModif,
      }}
    >
      <div className="w-full flex">
        <div className="w-1/7">
          <UnprojectedEntriesShelf entries={entries} />
        </div>
        <div className="w-6/7 bg-gray-100">
          <Canvas
            entries={entries}
            setEntries={setEntries}
            setDialogOpen={setDialogOpen}
            setEntrySpawnPosition={setEntrySpawnPosition}
          />
        </div>
        <EntryCreateDialog
          open={dialogOpen}
          onClose={() => {
            setDialogOpen(false);
            setEntrySpawnPosition({ xCord: 0, yCord: 0 });
            setEntryDataInModif(null);
          }}
          cfg={cfg}
          onDelete={handleDeleteEntry}
          position={entrySpawnPosition}
          entries={entries}
          entryData={entryDataInModif}
        />
      </div>
    </EditEntryContext.Provider>
  );
};

export default Editor;
