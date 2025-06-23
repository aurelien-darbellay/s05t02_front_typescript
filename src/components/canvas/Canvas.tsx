import React, { useState, useEffect,useRef} from 'react';
import { ContainerEntry, Position } from '../../model/EntriesGeneralFeatures.ts';
import { Entry } from './Entry.tsx';
import { mapDocDataToEntries } from './mappers/mapDocDataToEntries.ts';
import EntryCreateDialog from './EntryCreateDialog.tsx';
import { TypesConfig } from "../../model/TypesConfig";
import { AddButtonGrid } from './AddButtonGrid.tsx';
import { updateDocDataFromEntries } from './mappers/updateDocDataFromEntries.ts';
import { renderConcrete, createHandleAddEntry, useCanvasSize } from './CanvasHelpers.tsx';

interface CanvasProps {
  docData: any;
  cfg: TypesConfig;
  setDocData: (updatedDoc: any) => void;
}

export const Canvas: React.FC<CanvasProps> = ({ docData, cfg, setDocData }) => {
  const listEntries = mapDocDataToEntries(docData);
  const [entries, setEntries] = useState<ContainerEntry[]>(listEntries);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [canvasHeight, setCanvasHeight] = useState(1000); 
  const canvasRef = useRef<HTMLDivElement>(null);
  const {canvasReady,canvasSize} = useCanvasSize(canvasRef);

  const updatePosition = (entry: ContainerEntry, newPos: Position) => {
    const canvas  = canvasRef.current;
    if (!canvas) return;
    const updated = Object.assign(Object.create(Object.getPrototypeOf(entry)), entry, {position: newPos});
    setEntries((prevEntries) => prevEntries.map((e) => e.type === entry.type ? updated : e));
  };

  const handleAddEntry = createHandleAddEntry(docData.docId, setEntries);

  // Dynamically set canvas height based on entry positions
  useEffect(() => {
    const buffer = 200;
    let maxY = 0;
    entries.forEach((entry) => {
      const bottom = entry.position.yCord + 150; // approx. entry height
      if (bottom > maxY) maxY = bottom;
    });
    setCanvasHeight(maxY + buffer);
  }, [entries]);

  useEffect(() => {
    //console.log("Entries updated:", entries);
    const newDocData = updateDocDataFromEntries(docData,entries);
    setDocData(newDocData);
    //console.log("Updated document data:", newDocData);
  }, [entries]);

  return (
    <div ref={canvasRef} className="w-full" style={{ position: "relative" }}>
      <AddButtonGrid
        entries={entries}
        gridLines={Math.ceil(canvasHeight / 100)}
        onAddClick={() => setDialogOpen(true)}
      />

      {!canvasReady ? (
        <div className="text-center py-10 text-gray-600 text-lg">Adjusting positions...</div>
      ) : (
        entries.map((entry, idx) => (
          <Entry key={idx} entry={entry} onPositionChange={updatePosition} canvasSize={canvasSize}>
            {renderConcrete(entry)}
          </Entry>
        ))
      )}

      <EntryCreateDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        cfg={cfg}
        onSave={handleAddEntry}
      />
    </div>
  );
};





