// ListEntriesComponent.tsx
import React from 'react';
import { ListEntries } from '../../../model/EntriesGeneralFeatures';
import { ListItemComponent } from './ListItemComponent';
import { EntryListKeyWords } from '../../../model/EntriesConfig';
import { ListItemKeyWordsComponent } from './ListItemKeyWordsComponent';

interface ListEntriesComponentProps {
  listEntries: ListEntries;
}

export const ListEntriesComponent: React.FC<ListEntriesComponentProps> = ({
  listEntries,
}) => {
  if (EntryListKeyWords.includes(listEntries.type))
    return (
      <div className="flex flex-wrap w-full">
        {listEntries.entries.map((entry, index) =>
          entry.projected ? (
            <ListItemKeyWordsComponent key={index} entry={entry} />
          ) : (
            ''
          )
        )}
      </div>
    );
  return (
    <div>
      <ul>
        {listEntries.entries.map((entry, index) =>
          entry.projected ? <ListItemComponent key={index} entry={entry} /> : ''
        )}
      </ul>
    </div>
  );
};
