import React, { useState, useLayoutEffect } from 'react';
import {
  ContainedEntry,
  ContainerEntry,
} from '../../model/EntriesGeneralFeatures.ts';
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
import axios from '../../axiosConfig.ts';
import { ApiPaths } from '../../apiPaths.ts';
import { EntryContainerTypes } from '../../model/EntriesConfig.ts';
import { mapSingleEntryDataToInstance } from './mappers/mapSingleEntryDataToInstance.ts';

const updateEntriesInState = (
  entries: ContainerEntry[],
  updatedEntry: ContainerEntry
): ContainerEntry[] => {
  //console.log(updatedEntry);
  let wasModified = false;
  const updatedEntries = entries.map((entry) => {
    if (entry.type == updatedEntry.type) {
      wasModified = true;
      return updatedEntry;
    }
    return entry;
  });
  if (!wasModified) updatedEntries.push(updatedEntry);
  return updatedEntries;
};

export const createHandleAddEntry = (
  docId: string,
  setEntries: React.Dispatch<React.SetStateAction<ContainerEntry[]>>,
  exposeError: React.Dispatch<React.SetStateAction<boolean>>,
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>
) => {
  return async (entryData: any, isEditing: boolean) => {
    try {
      //console.log(entryData);
      const url =
        ApiPaths.ENTRY_BASE_PATH.replace('{docId}', docId) +
        (isEditing ? ApiPaths.ENTRY_UPDATE_REL : ApiPaths.ENTRY_ADD_REL);
      const payload = {
        ...entryData,
        type: entryData.type,
      };
      const response = await axios.post(url, payload, {
        withCredentials: true,
      });
      //console.log(response.data);
      const newEntry = mapSingleEntryDataToInstance(response.data);
      //console.log(newEntry);
      setEntries((prev) => updateEntriesInState(prev, newEntry));
    } catch (error) {
      exposeError(true);
      setErrorMessage('Failed to add entry: ' + (error as Error).message);
    }
  };
};

const removeEntryFromState = (
  entries: ContainerEntry[],
  entryData: any
): ContainerEntry[] => {
  if (EntryContainerTypes.includes(entryData.type))
    return entries.filter((entry) => entry.type !== entryData.type);
  const updatedEntries = entries.map((entry) => {
    if (entry.displayedType === entryData.displayedType) {
      const list = ListEntries.from(entry as ListEntries);
      list.entries = list.entries.filter((item) => {
        return (item as ContainedEntry).id != entryData.id;
      });
      return list;
    }
    return entry;
  });
  return updatedEntries;
};

export const createHandleDeleteEntry = (
  docId: string,
  setEntries: React.Dispatch<React.SetStateAction<ContainerEntry[]>>,
  exposeError: React.Dispatch<React.SetStateAction<boolean>>,
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>
) => {
  return async (entryData: ContainerEntry) => {
    try {
      const url =
        ApiPaths.ENTRY_BASE_PATH.replace('{docId}', docId) +
        ApiPaths.ENTRY_DELETE_REL;
      const payload = {
        ...entryData,
        type: entryData.type,
      };

      await axios.post(url, payload, { withCredentials: true });
      setEntries((prev) => removeEntryFromState(prev, entryData));
    } catch (error) {
      exposeError(true);
      setErrorMessage('Failed to delete entry: ' + (error as Error).message);
    }
  };
};

export const renderConcrete = (entry: ContainerEntry) => {
  if (entry instanceof Contact)
    return <ContactComponent contact={entry as Contact} />;
  if (entry instanceof Identity)
    return <IdentityComponent identity={entry as Identity} />;
  if (entry instanceof Profession)
    return <ProfessionComponent profession={entry as Profession} />;
  if (entry instanceof ProfilePicture)
    return <ProfilePictureComponent profilePicture={entry as ProfilePicture} />;
  if (entry instanceof Summary)
    return <SummaryComponent summary={entry as Summary} />;
  if (entry instanceof ListEntries) {
    return <ListEntriesComponent listEntries={entry as ListEntries} />;
  }

  return null;
};

export const useCanvasSize = (
  canvasRef: React.RefObject<HTMLElement | null>
) => {
  const [canvasSize, setCanvasSize] = useState({ canvasWidth: 0, height: 0 });
  const [canvasReady, setCanvasReady] = useState(false);

  useLayoutEffect(() => {
    if (!canvasRef || !canvasRef.current) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const updateSize = () => {
      const { width, height } = canvas.getBoundingClientRect();
      if (width > 0 && height > 0) {
        setCanvasSize({ canvasWidth: width, height });
        setCanvasReady(true);
      }
    };

    updateSize(); // Initial check

    const resizeObserver = new ResizeObserver(updateSize);
    resizeObserver.observe(canvas);

    return () => resizeObserver.disconnect();
  }, [canvasRef]);

  return { canvasSize, canvasReady };
};
