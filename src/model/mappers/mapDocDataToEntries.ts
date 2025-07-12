import { ContainerEntry } from '../EntriesGeneralFeatures'; // assuming this exports the type
import { CvEntries } from '../EntriesConfig';
import { mapSingleEntryDataToInstance } from './mapSingleEntryDataToInstance';

export function mapDocDataToEntries(docData: any): ContainerEntry[] {
  const entries: ContainerEntry[] = [];

  for (const key in docData) {
    if (CvEntries.includes(key) && docData[key]) {
      //console.log(mapSingleEntryDataToInstance(docData[key]));
      entries.push(mapSingleEntryDataToInstance(docData[key]));
    }
  }
  return entries;
}
