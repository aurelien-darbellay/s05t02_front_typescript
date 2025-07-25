import { Profession } from '../concreteEntries/Profession';
import { Identity } from '../concreteEntries/Identity';
import { Contact } from '../concreteEntries/Contact';
import { Summary } from '../concreteEntries/Summary';
import { ProfilePicture } from '../concreteEntries/ProfilePicture';
import { ContainerEntry } from '../EntriesGeneralFeatures'; // assuming this exports the type
import { mapToListEntry } from './mapToListEntry';

export function mapSingleEntryDataToInstance(
  entryData: any
): ContainerEntry | null {
  //console.log(entryData);
  if (!entryData?.type) return null;

  const type = entryData.type;
  //console.log(entryData.type + ' and ' + type);
  switch (type) {
    case 'PROFESSION':
      return new Profession(
        entryData.header,
        entryData.generalTitle,
        entryData.specificTitle,
        entryData.position || { xCord: 0, yCord: 0 },
        entryData.color,
        entryData.size,
        entryData.projected,
        entryData.highlighted,
        entryData.id,
        entryData.previousEntry,
        entryData.nextEntry
      );

    case 'IDENTITY':
      return new Identity(
        entryData.header,
        entryData.position || { xCord: 0, yCord: 0 },
        entryData.color,
        entryData.size,
        entryData.projected,
        entryData.highlighted,
        entryData.names,
        entryData.lastNames,
        entryData.id,
        entryData.previousEntry,
        entryData.nextEntry
      );

    case 'PROFILE_PICTURE':
      return new ProfilePicture(
        entryData.header,
        entryData.documentCloudMetadata,
        entryData.shape,
        entryData.position || { xCord: 0, yCord: 0 },
        entryData.color,
        entryData.size,
        entryData.projected,
        entryData.highlighted,
        entryData.id,
        entryData.previousEntry,
        entryData.nextEntry
      );

    case 'CONTACT':
      return new Contact(
        entryData.header,
        entryData.position || { xCord: 0, yCord: 0 },
        entryData.color,
        entryData.size,
        entryData.phoneNumber,
        entryData.email,
        entryData.linkedInAccount,
        entryData.gitHubAccount,
        entryData.instagramAccount,
        entryData.facebookAccount,
        entryData.cityOfResidence,
        entryData.zipCode,
        entryData.projected,
        entryData.highlighted,
        entryData.id,
        entryData.previousEntry,
        entryData.nextEntry
      );

    case 'SUMMARY':
      return new Summary(
        entryData.header,
        entryData.title,
        entryData.text,
        entryData.position || { xCord: 0, yCord: 0 },
        entryData.color,
        entryData.size,
        entryData.projected,
        entryData.highlighted,
        entryData.id,
        entryData.previousEntry,
        entryData.nextEntry
      );

    case 'EDUCATION':
    case 'EXPERIENCE':
    case 'LANGUAGE':
    case 'TECHNICAL_SKILL':
    case 'SOFT_SKILL':
    case 'PORTFOLIO':
    case 'LIST_EDUCATION':
    case 'LIST_EXPERIENCE':
    case 'LIST_LANGUAGE':
    case 'LIST_TECHNICAL_SKILL':
    case 'LIST_SOFT_SKILL':
    case 'LIST_PORTFOLIO': {
      return mapToListEntry(entryData);
    }

    default:
      return null;
  }
}
