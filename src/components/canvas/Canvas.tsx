import React, { useState, useEffect, useRef } from 'react';
import {
  ContainerEntry,
  Position,
} from '../../model/EntriesGeneralFeatures.ts';
import { Entry } from './Entry.tsx';
import { mapDocDataToEntries } from './mappers/mapDocDataToEntries.ts';
import EntryCreateDialog from './entryCreation/EntryCreateDialog.tsx';
import { TypesConfig } from '../../model/TypesConfig';
import { AddButtonGrid } from './AddButtonGrid.tsx';
import { updateDocDataFromEntries } from './mappers/updateDocDataFromEntries.ts';
import {
  renderConcrete,
  createHandleAddEntry,
  useCanvasSize,
  createHandleDeleteEntry,
} from './CanvasHelpers.tsx';

interface CanvasProps {
  docData: any;
  cfg: TypesConfig;
  setDocData: (updatedDoc: any) => void;
  resetDocData: (updatedDoc: any) => void;
  dialogOpen: boolean;
  setDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setUpdateUser: React.Dispatch<React.SetStateAction<boolean>>;
  setUpdateUserMessage: React.Dispatch<React.SetStateAction<string>>;
}

export const Canvas: React.FC<CanvasProps> = ({
  docData,
  cfg,
  setDocData,
  resetDocData,
  dialogOpen,
  setDialogOpen,
  setUpdateUser,
  setUpdateUserMessage,
}) => {
  const listEntries = mapDocDataToEntries(docData);
  //console.log('Entries fetched: ', listEntries);
  const [entries, setEntries] = useState<ContainerEntry[]>(listEntries);
  const [canvasHeight, setCanvasHeight] = useState(1000);
  const canvasRef = useRef<HTMLDivElement>(null);
  const {
    canvasReady,
    canvasSize: { canvasWidth },
  } = useCanvasSize(canvasRef);
  const [existOpenEntry, setExistOpenEntry] = useState(false);
  const [entrySpawnPosition, setEntrySpawnPosition] = useState<{
    xCord: number;
    yCord: number;
  } | null>({ xCord: 0, yCord: 0 });
  const [entryDataInModif, setEntryDataInModif] = useState<typeof Entry | null>(
    null
  );

  const updatePosition = (entry: ContainerEntry, newPos: Position) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const updated = Object.assign(
      Object.create(Object.getPrototypeOf(entry)),
      entry,
      { position: newPos }
    );
    setEntries((prevEntries) =>
      prevEntries.map((e) => (e.type === entry.type ? updated : e))
    );
  };

  const handleAddEntry = createHandleAddEntry(
    docData.id,
    setEntries,
    setUpdateUser,
    setUpdateUserMessage,
    resetDocData
  );

  const handleDeleteEntry = createHandleDeleteEntry(
    docData.id,
    setEntries,
    setUpdateUser,
    setUpdateUserMessage
  );

  useEffect(() => {
    const buffer = 0;
    let maxY = window.innerHeight - 250;
    entries.forEach((entry) => {
      const bottom = entry.position.yCord + 50;
      if (bottom > maxY) maxY = bottom;
    });
    setCanvasHeight(maxY + buffer);
  }, [entries]);

  useEffect(() => {
    const newDocData = updateDocDataFromEntries(docData, entries);
    setDocData(newDocData);
  }, [entries]);

  useEffect(() => {
    setEntries((prev) => mapDocDataToEntries(docData));
  }, [docData]);

  const onAddClick = (relativeX, relativeY) => {
    setEntryDataInModif(null);
    setEntrySpawnPosition({ xCord: relativeX, yCord: relativeY });
    setDialogOpen(true);
  };

  const handleEditEntry = (entry: typeof Entry) => {
    //console.log('Editing entry:', entry);
    setEntryDataInModif(entry);
    setDialogOpen(true);
  };

  return (
    <div ref={canvasRef} className="w-full" style={{ position: 'relative' }}>
      <AddButtonGrid
        entries={entries}
        gridLines={Math.ceil(canvasHeight / 100)}
        onAddClick={onAddClick}
        existOpenEntry={existOpenEntry}
        canvasRef={canvasRef}
      />

      {!canvasReady ? (
        <div className="text-center py-10 text-gray-600 text-lg">
          Adjusting positions...
        </div>
      ) : (
        entries.map((entry, idx) => (
          <Entry
            key={idx}
            entry={entry}
            onPositionChange={updatePosition}
            width={canvasWidth}
            setExistOpenEntry={setExistOpenEntry}
            onEditEntry={handleEditEntry}
          >
            {renderConcrete(entry)}
          </Entry>
        ))
      )}

      <EntryCreateDialog
        open={dialogOpen}
        onClose={() => {
          setDialogOpen(false);
          setEntrySpawnPosition({ xCord: 0, yCord: 0 });
          setEntryDataInModif(null);
        }}
        cfg={cfg}
        onSave={handleAddEntry}
        onDelete={handleDeleteEntry}
        position={entrySpawnPosition}
        entries={entries}
        entryData={entryDataInModif}
      />
    </div>
  );
};
