// ListEntriesComponent.tsx
import React from 'react';
import {ListEntries } from '../../model/EntriesGeneralFeatures';


interface ListEntriesComponentProps{
  listEntries: ListEntries;
}

export const ListEntriesComponent: React.FC<ListEntriesComponentProps> = ({
  listEntries}) =>{
  return (
    <div>
      <p>
        <strong>Projected:</strong> {listEntries.projected ? 'Yes' : 'No'}
      </p>
      <p>
        <strong>Highlighted:</strong> {listEntries.highlighted ? 'Yes' : 'No'}
      </p>
      <p>
        <strong>Position:</strong> x={listEntries.position.xCord}, y={listEntries.position.yCord}
      </p>
      <p>
        <strong>Color:</strong> {listEntries.color}
      </p>
      <p>
        <strong>Size:</strong> {listEntries.size}
      </p>
      <p>
        <strong>Previous Entry:</strong> projected={listEntries.previousEntry.projected ? 'Yes' : 'No'}
        , highlighted={listEntries.previousEntry.highlighted ? 'Yes' : 'No'}
      </p>
      <p>
        <strong>Next Entry:</strong> projected={listEntries.nextEntry.projected ? 'Yes' : 'No'}
        , highlighted={listEntries.nextEntry.highlighted ? 'Yes' : 'No'}
      </p>

      <h3>Entries ({listEntries.entries.length})</h3>
      <ul>
        {listEntries.entries.map((entry, index) => (
          <li key={index}>
            <p>
              <strong>Entry #{index + 1}:</strong>
            </p>
            <p>
              &nbsp;&nbsp;<strong>Projected:</strong> {entry.projected ? 'Yes' : 'No'}
            </p>
            <p>
              &nbsp;&nbsp;<strong>Highlighted:</strong> {entry.highlighted ? 'Yes' : 'No'}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
