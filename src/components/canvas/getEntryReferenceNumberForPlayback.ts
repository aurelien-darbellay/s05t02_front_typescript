import { EntryListTypes } from '../../model/EntriesConfig';
import { Entry, ListEntries } from '../../model/EntriesGeneralFeatures';

const ENTRY_TEXT_FIELDS = [
  'phoneNumber',
  'email',
  'linkedInAccount',
  'gitHubAccount',
  'instagramAccount',
  'facebookAccount',
  'cityOfResident',
  'zipCode',
  'title',
  'trainingCenter',
  'graduationYear',
  'comments',
  'role',
  'nameCompany',
  'description',
  'keywords',
  'names',
  'lastNames',
  'name',
  'level',
  'projectName',
  'generalTitle',
  'specificTitle',
  'keyWords',
  'text',
];

export function getEntryReferenceNumberForPlayback(entry: Entry): number {
  let result = 0;

  if (EntryListTypes.includes(entry.type)) {
    if (Array.isArray((entry as ListEntries).entries)) {
      for (const e of (entry as ListEntries).entries) {
        result += getEntryReferenceNumberForPlayback(e);
      }
    }
  }

  if (entry.type === 'PROFILE_PICTURE') {
    result += 20;
  }

  for (const field of ENTRY_TEXT_FIELDS) {
    const value = (entry as any)[field];
    if (value != null) {
      result += String(value).length;
    }
  }

  return result;
}
