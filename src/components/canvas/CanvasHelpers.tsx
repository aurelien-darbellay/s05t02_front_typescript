import React, { useState, useLayoutEffect } from 'react';
import { ContainerEntry } from '../../model/EntriesGeneralFeatures.ts';
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
import { mapSingleEntryDataToInstance } from './mappers/mapSingleEntryDataToInstance.ts';
import axios from '../../axiosConfig.ts';
import { ApiPaths } from '../../apiPaths.ts';
import { EntryTypesFormatter } from './entryTypesFormatter.ts';
import { fetchDocData } from '../../helpers/generalFetchers.ts';

export const createHandleAddEntry = (
  docId: string,
  setEntries: React.Dispatch<React.SetStateAction<ContainerEntry[]>>,
  exposeError: React.Dispatch<React.SetStateAction<boolean>>,
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>,
  resetDocData: (docData: any) => void
) => {
  return async (entryData: any) => {
    try {
      const url =
        ApiPaths.ENTRY_BASE_PATH.replace('{docId}', docId) +
        ApiPaths.ENTRY_ADD_REL;
      const payload = {
        ...entryData,
        type: EntryTypesFormatter.fromCamelToConstant(entryData.type),
      };
      await axios.post(url, payload, { withCredentials: true });
      const response = await fetchDocData(docId);
      console.log('new data:', response.data);
      resetDocData((prev) => ({ ...response.data }));
    } catch (error) {
      exposeError(true);
      setErrorMessage('Failed to add entry: ' + (error as Error).message);
    }
  };
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
        type: EntryTypesFormatter.fromCamelToConstant(entryData.type),
      };

      await axios.post(url, payload, { withCredentials: true });

      setEntries((prev) =>
        prev.filter((entry) => entry.codeName !== entryData.codeName)
      );
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
  if (entry instanceof ListEntries)
    return <ListEntriesComponent listEntries={entry as ListEntries} />;
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
