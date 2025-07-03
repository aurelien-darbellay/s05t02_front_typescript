import React from 'react';
import { Entry } from '../../model/EntriesGeneralFeatures';
import ProjectionToggler from '../canvas/ProjectionToggler';

interface ShelvedEntryProps {
  entry: Entry;
}

const ShelvedEntry: React.FC<ShelvedEntryProps> = ({ entry }) => {
  return (
    <div className="w-[85%] rounded-lg shadow-md p-4 bg-white hover:shadow-lg transition-shadow duration-200">
      <h3 className="text-lg font-semibold mb-2">{entry.type}</h3>
      <ProjectionToggler entry={entry} />
    </div>
  );
};

export default ShelvedEntry;
