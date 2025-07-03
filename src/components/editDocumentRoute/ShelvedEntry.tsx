import React, { useState } from 'react';
import { Entry } from '../../model/EntriesGeneralFeatures';
import ProjectionToggler from '../canvas/ProjectionToggler';
import { mapEntryToComponent } from '../../model/mappers/mapEntryToComponent';

interface ShelvedEntryProps {
  entry: Entry;
}

const ShelvedEntry: React.FC<ShelvedEntryProps> = ({ entry }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`w-[85%] rounded-lg shadow-md p-4 bg-white transition-shadow duration-200 ${
        isHovered ? 'shadow-lg' : ''
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <h3 className="text-lg font-semibold mb-2">{entry.type}</h3>
      <ProjectionToggler entry={entry} />
      {isHovered && mapEntryToComponent(entry)}
    </div>
  );
};

export default ShelvedEntry;
