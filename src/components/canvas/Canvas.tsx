import React, { useState, useEffect} from 'react';
import { ContainerEntry, Position } from '../../model/EntriesGeneralFeatures.ts';
import { Entry } from './Entry.tsx';
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
import { AddButtonGrid } from './AddButtonGrid.tsx';
import { mapSingleEntryDataToInstance } from './mapSingleEntryDataToInstance.ts';
import axios from "../../axiosConfig.ts";
import { ApiPaths } from '../../apiPaths.ts';
import { updateDocDataFromEntries } from './updateDocDataFromEntries.ts';

interface CanvasProps {
  docData: any;
  cfg: TypesConfig;
  setDocData: (updatedDoc: any) => void;
}

export const Canvas: React.FC<CanvasProps> = ({ docData, cfg, setDocData }) => {
  const listEntries = mapDocDataToEntries(docData);
  const [entries, setEntries] = useState<ContainerEntry[]>(listEntries);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [canvasHeight, setCanvasHeight] = useState(1000); // default canvas height

  const updatePosition = (entry: ContainerEntry, newPos: Position) => {
      const updated = Object.assign(Object.create(Object.getPrototypeOf(entry)), entry, {position: newPos});
      setEntries((prevEntries) => prevEntries.map((e) => e.type === entry.type ? updated : e));
  };

  const handleAddEntry = async (entryData: any) => {
    console.log("Adding new entry with data:", entryData);
    const newEntry: ContainerEntry | null = mapSingleEntryDataToInstance(entryData);
    if (newEntry) setEntries((prev) => [...prev, newEntry]);
    const url = ApiPaths.ENTRY_BASE_PATH.replace("{docId}", docData.id) + ApiPaths.ENTRY_ADD_REL;
    entryData = {...entryData,type: entryData.type.toUpperCase()}; // normalize type
    const response = await axios.post(url, entryData,{withCredentials: true});
    console.log("New entry added:", response.data);
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
    updateDocDataFromEntries(entries,setDocData);
    console.log("Document data updated from entries:", docData);
  }, [entries]);

  return (
        <div className="w-full" style={{ position: "relative" }}>
          <AddButtonGrid
            entries={entries}
            gridLines={Math.ceil(canvasHeight / 100)}
            onAddClick={() => setDialogOpen(true)}
          />
          {entries.map((entry, idx) => (
            <Entry key={idx} entry={entry} onPositionChange={updatePosition}>
              {renderConcrete(entry)}
            </Entry>
          ))}

          <EntryCreateDialog
            open={dialogOpen}
            onClose={() => setDialogOpen(false)}
            cfg={cfg}
            onSave={handleAddEntry}
          />
    </div>
  );
};





