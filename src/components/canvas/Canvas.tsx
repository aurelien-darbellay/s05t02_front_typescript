
import React, { useState } from 'react';
import { ContainerEntry, Position } from '../../model/EntriesGeneralFeatures.ts';
import { Entry } from '../Entry.tsx';
import { ContactComponent } from './entriesComponents/ContactComponent.tsx';
import { IdentityComponent } from './entriesComponents/IdentityComponent.tsx';
import { ProfessionComponent } from './entriesComponents/ProfessionComponent.tsx';
import { ProfilePictureComponent } from './entriesComponents/ProfilePictureComponent.tsx';
import { SummaryComponent } from './entriesComponents/SummaryComponent.tsx';
import { ListEntriesComponent } from './entriesComponents/ListEntriesComponent.tsx';

import { Contact } from '../../model/concreteEntries/Contact.ts';
import { Identity } from '../../model/concreteEntries/Identity.ts';
import { Profession } from '../../model/concreteEntries/Profession.ts';
import { ProfilePicture } from '../../model/concreteEntries/ProfilePicture.ts';
import { Summary } from '../../model/concreteEntries/Summary.ts';
import { ListEntries } from '../../model/EntriesGeneralFeatures.ts';
import { mapDocDataToEntries } from './mapDocDataToEntries.ts';
import EntryCreateDialog from './EntryCreateDialog.tsx';
import { TypesConfig } from "../../model/TypesConfig";

interface CanvasProps {
  docData: any;
    cfg: TypesConfig;
}

export const Canvas: React.FC<CanvasProps> = ({ docData, cfg }) => {
  const listEntries = mapDocDataToEntries(docData);
  const [entries, setEntries] = useState<ContainerEntry[]>(listEntries);
  const [dialogOpen, setDialogOpen] = useState(false);

  const updatePosition = (entry: ContainerEntry, newPos: Position) => {
    entry.position = newPos;
    setEntries((prev) => [...prev]);
  };

  const handleAddEntry = (entryData: any) => {
    // placeholder: you should create an instance based on entryData.type
    const newEntry: ContainerEntry = {
      type: entryData.type,
      projected: false,
      highlighted: false,
      position: { xCord: 0, yCord: 0 },
      color: "gray",
      size: 1,
      previousEntry: { projected: false, highlighted: false, type: "empty" },
      nextEntry: { projected: false, highlighted: false, type: "empty" }
    };
    setEntries((prev) => [...prev, newEntry]);
  };

  const renderConcrete = (entry: ContainerEntry) => {
    if (entry instanceof Contact) return <ContactComponent contact={entry as Contact} />;
    if (entry instanceof Identity) return <IdentityComponent identity={entry as Identity} />;
    if (entry instanceof Profession) return <ProfessionComponent profession={entry as Profession} />;
    if (entry instanceof ProfilePicture) return <ProfilePictureComponent profilePicture={entry as ProfilePicture} />;
    if (entry instanceof Summary) return <SummaryComponent summary={entry as Summary} />;
    if (entry instanceof ListEntries) return <ListEntriesComponent listEntries={entry as ListEntries} />;
    return null;
  };

  return (
    <div className="relative w-full h-[100vh] bg-gray-100 overflow-hidden">
      {/* Grid of invisible + buttons */}
      <div className="absolute inset-0 grid grid-cols-6 grid-rows-6 gap-4 p-4 z-10">
        {Array.from({ length: 36 }).map((_, idx) => (
          <button
            key={idx}
            onClick={() => setDialogOpen(true)}
            className="opacity-0 hover:opacity-100 transition-opacity duration-300 bg-white text-gray-600 border-2 border-dashed border-gray-400 rounded-md flex items-center justify-center text-2xl"
          >
            +
          </button>
        ))}
      </div>

      {/* Render entries */}
      {entries.map((entry, idx) => (
        <Entry key={idx} entry={entry} onPositionChange={updatePosition}>
          {renderConcrete(entry)}
        </Entry>
      ))}

      {/* Dialog */}
      <EntryCreateDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        cfg={cfg}
        onSave={handleAddEntry}
      />
    </div>
  );
};
