import React, { useState } from 'react';
import { Entry } from '../../model/EntriesGeneralFeatures';
import ProjectionToggler from './ProjectionToggler';
import { mapEntryToComponent } from '../../model/mappers/mapEntryToComponent';
import { EntryListTypes } from '../../model/EntriesConfig';

interface ShelvedEntryProps {
  entry: Entry;
  editable: boolean;
}

const ShelvedEntry: React.FC<ShelvedEntryProps> = ({ entry, editable }) => {
  const [isHovered, setIsHovered] = useState(false);
  const title = EntryListTypes.includes(entry.type)
    ? `List: ${entry.displayedType}`
    : entry.displayedType;
  return (
    <div
      className={`w-[85%] rounded-lg shadow-md p-4 bg-white transition-shadow duration-200 ${
        isHovered ? 'shadow-lg' : ''
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <h3 className="text-m font-semibold mb-2">{title}</h3>
      {isHovered && mapEntryToComponent(entry)}
      <ProjectionToggler entry={entry} editable={editable} />
    </div>
  );
};

export default ShelvedEntry;
