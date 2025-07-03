// ListEntriesComponent.tsx
import React from 'react';
import { ListEntries } from '../../../model/EntriesGeneralFeatures';
import { ListItemComponent } from './ListItemComponent';

interface ListEntriesComponentProps {
  listEntries: ListEntries;
}

export const ListEntriesComponent: React.FC<ListEntriesComponentProps> = ({
  listEntries,
}) => {
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
