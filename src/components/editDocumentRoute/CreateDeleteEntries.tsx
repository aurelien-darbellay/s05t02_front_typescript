import {
  ContainedEntry,
  ContainerEntry,
  Entry,
} from '../../model/EntriesGeneralFeatures.ts';
import { ListEntries } from '../../model/EntriesGeneralFeatures.ts';
import axios from '../../axiosConfig.ts';
import { ApiPaths } from '../../apiPaths.ts';
import { EntryContainerTypes } from '../../model/EntriesConfig.ts';
import { mapSingleEntryDataToInstance } from '../../model/mappers/mapSingleEntryDataToInstance.ts';

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
  return async (entryData: Entry) => {
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
