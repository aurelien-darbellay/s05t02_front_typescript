import React, { useState, useEffect, useRef } from 'react';
import {
  ContainerEntry,
  Position,
} from '../../model/EntriesGeneralFeatures.ts';
import { Entry } from './Entry.tsx';
import { mapDocDataToEntries } from './mappers/mapDocDataToEntries.ts';
import EntryCreateDialog from './EntryCreateDialog.tsx';
import { TypesConfig } from '../../model/TypesConfig';
import { AddButtonGrid } from './AddButtonGrid.tsx';
import { updateDocDataFromEntries } from './mappers/updateDocDataFromEntries.ts';
import {
  renderConcrete,
  createHandleAddEntry,
  useCanvasSize,
} from './CanvasHelpers.tsx';
import UserUpdateDialog from '../UserUpdateDialog.tsx';

interface CanvasProps {
  docData: any;
  cfg: TypesConfig;
  setDocData: (updatedDoc: any) => void;
  dialogOpen: boolean;
  setDialogOpen: (open: boolean) => void;
}

export const Canvas: React.FC<CanvasProps> = ({
  docData,
  cfg,
  setDocData,
  dialogOpen,
  setDialogOpen,
}) => {
  const listEntries = mapDocDataToEntries(docData);
  const [entries, setEntries] = useState<ContainerEntry[]>(listEntries);
  const [canvasHeight, setCanvasHeight] = useState(1000);
  const canvasRef = useRef<HTMLDivElement>(null);
  const {
    canvasReady,
    canvasSize: { canvasWidth },
  } = useCanvasSize(canvasRef);
  const [updateUser, setUpdateUser] = useState(false);
  const [updateUserMessage, setUpdateUserMessage] = useState('');
  const [existOpenEntry, setExistOpenEntry] = useState(false);
  const [entrySpawnPosition, setEntrySpawnPosition] = useState<{
    xCord: number;
    yCord: number;
  } | null>({ xCord: 0, yCord: 0 });

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

  //console.log("Doc Id:", docData.id);
  const handleAddEntry = createHandleAddEntry(
    docData.id,
    setEntries,
    setUpdateUser,
    setUpdateUserMessage
  );

  // Dynamically set canvas height based on entry positions
  useEffect(() => {
    const buffer = 100;
    let maxY = 0;
    entries.forEach((entry) => {
      const bottom = entry.position.yCord + 150; // approx. entry height
      if (bottom > maxY) maxY = bottom;
    });
    setCanvasHeight(maxY + buffer);
  }, [entries]);

  useEffect(() => {
    //console.log("Entries updated:", entries);
    const newDocData = updateDocDataFromEntries(docData, entries);
    setDocData(newDocData);
    //console.log("Updated document data:", newDocData);
  }, [entries]);

  const onAddClick = (relativeX, relativeY) => {
    setEntrySpawnPosition({ xCord: relativeX, yCord: relativeY });
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
        }}
        cfg={cfg}
        onSave={handleAddEntry}
        position={entrySpawnPosition}
        entries={entries}
      />
      <UserUpdateDialog
        open={updateUser}
        message={updateUserMessage}
        onClick={() => setUpdateUser(false)}
      />
    </div>
  );
};
