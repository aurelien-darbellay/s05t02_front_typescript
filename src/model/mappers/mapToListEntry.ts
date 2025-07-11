import { EntryListItemTypes, EntryListTypes } from '../EntriesConfig';
import { ListEntries } from '../EntriesGeneralFeatures';
import { EntryTypesFormatter } from '../entryTypesFormatter';
import { mapToListItem } from './mapToListItem';

export const mapToListEntry = (entryData: any): ListEntries | null => {
  const normalizedPosition = entryData.position ?? { xCord: 0, yCord: 0 };
  let type = entryData.type;
  const projected = entryData.projected ?? true;
  const highlighted = entryData.highlighted ?? false;
  const id = entryData.id ?? undefined;
  let mappedEntries;
  if (EntryListItemTypes.includes(type)) {
    mappedEntries = [mapToListItem(entryData, id, projected, highlighted)];
  } else if (EntryListTypes.includes(type)) {
    mappedEntries = entryData.entries
      ? entryData.entries.map((entry) =>
          mapToListItem(entry, entry.id, entry.projected, entry.highlighted)
        )
      : [];
    type = EntryTypesFormatter.fromListToItem(type);
  }
  const list = new ListEntries(
    mappedEntries,
    entryData.projected,
    entryData.highlighted,
    normalizedPosition,
    entryData.color,
    entryData.size,
    type,
    entryData.id,
    entryData.previousEntry,
    entryData.nextEntry
  );
  return list;
};
