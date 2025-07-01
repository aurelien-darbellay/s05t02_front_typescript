import { ContainerEntry } from '../../../model/EntriesGeneralFeatures';
import { EntryTypesFormatter } from '../entryTypesFormatter';
export function updateDocDataFromEntries(
  docData: any,
  entries: ContainerEntry[]
) {
  //console.log("Updating document data from entries:", entries);
  const newDocData = { ...docData };
  //console.log("Initial document data:", newDocData);
  for (const entry of entries) {
    const extractedType = EntryTypesFormatter.fromConstantToCamel(
      EntryTypesFormatter.fromListToItem(entry.type)
    );
    newDocData[extractedType] = { ...entry, keyNameInDB: extractedType };
  }
  //console.log('Updated document:', newDocData);
  return newDocData;
}
