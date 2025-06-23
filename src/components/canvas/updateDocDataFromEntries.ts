import { Profession } from "../../model/concreteEntries/Profession";
import { Identity } from "../../model/concreteEntries/Identity";
import { Contact } from "../../model/concreteEntries/Contact";
import { Summary } from "../../model/concreteEntries/Summary";
import { ProfilePicture } from "../../model/concreteEntries/ProfilePicture";
import { ContainerEntry, ListEntries} from "../../model/EntriesGeneralFeatures";
export function updateDocDataFromEntries(
  entries: ContainerEntry[],
  setDocData: (updatedDoc: any) => void
) {
  const newDoc: any = {};

  for (const entry of entries) {
    if (entry instanceof Contact) {
      newDoc.contact = {
        ...entry,
      };
    } else if (entry instanceof Identity) {
      newDoc.identity = {
        ...entry,
      };
    } else if (entry instanceof Profession) {
      newDoc.profession = {
        ...entry,
        position: {...entry.position}
      };
    } else if (entry instanceof ProfilePicture) {
      newDoc.profilePicture = {
        ...entry,
      };
    } else if (entry instanceof Summary) {
      newDoc.summary = {
        ...entry,
      };
    } else if (entry instanceof ListEntries) {
      const extractedType = entry.type;

      newDoc[extractedType] = {
        entries: entry.entries.map((item: any) => ({ ...item })),
        projected: entry.projected,
        highlighted: entry.highlighted,
        position: entry.position,
        color: entry.color,
        size: entry.size,
        previousEntry: entry.previousEntry,
        nextEntry: entry.nextEntry,
        keyNameInDB: extractedType,
      };
    }
  }
  
  console.log("Position in newDoc:", newDoc.profession.position);
  console.log("Updated document data:", newDoc);
  setDocData({...newDoc});
    
}
