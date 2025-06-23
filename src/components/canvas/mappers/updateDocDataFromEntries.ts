import { Profession } from "../../../model/concreteEntries/Profession";
import { Identity } from "../../../model/concreteEntries/Identity";
import { Contact } from "../../../model/concreteEntries/Contact";
import { Summary } from "../../../model/concreteEntries/Summary";
import { ProfilePicture } from "../../../model/concreteEntries/ProfilePicture";
import { ContainerEntry, ListEntries} from "../../../model/EntriesGeneralFeatures";
export function updateDocDataFromEntries(
  docData: any,
  entries: ContainerEntry[]
) {
  //console.log("Updating document data from entries:", entries);
  const newDocData = {...docData};
  //console.log("Initial document data:", newDocData);
  for (const entry of entries) {
    if (entry instanceof Contact) {
      newDocData.contact = {
        ...entry,
        position: {
          xCord: entry.position.xCord,
          yCord: entry.position.yCord // Ensure position is included
        },
      };
    } else if (entry instanceof Identity) {
      newDocData.identity = {
        ...entry,
        position: {
          xCord: entry.position.xCord,
          yCord: entry.position.yCord // Ensure position is included
        },
      };
    } else if (entry instanceof Profession) {
      //console.log("Updating profession in:", newDocData);
      newDocData.profession = {
        ...entry,
        position: {
          xCord: entry.position.xCord,
          yCord: entry.position.yCord // Ensure position is included
        },
      };
    } else if (entry instanceof ProfilePicture) {
      newDocData.profilePicture = {
        ...entry,
        position: {
          xCord: entry.position.xCord,
          yCord: entry.position.yCord // Ensure position is included
        },
      };
    } else if (entry instanceof Summary) {
      newDocData.summary = {
        ...entry,
        position: {
          xCord: entry.position.xCord,
          yCord: entry.position.yCord // Ensure position is included
        },
      };
    } else if (entry instanceof ListEntries) {
      const extractedType = entry.type;

      newDocData[extractedType] = {
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
  
  //console.log("Updated document:", newDocData);
  return newDocData;
}
