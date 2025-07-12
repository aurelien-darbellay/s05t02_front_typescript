import React from 'react';
import { Education } from '../../../model/concreteEntries/Education';
import CloudAccessManager from '../../cloud/CloudAccessManager';

interface EducationComponentProps {
  education: Education;
}

export const EducationComponent: React.FC<EducationComponentProps> = ({
  education,
}) => {
  const isNonEmpty = (value?: string | number | null) =>
    value !== undefined && value !== null && value !== '' && value !== 0;

  return (
    <div
      className="flex items-start gap-4 space-y-0"
      style={{
        width: '100%',
        alignItems: 'flex-start',
      }}
    >
      {/* Left side: text content (90%) */}
      <div style={{ flex: '0 0 80%' }}>
        {isNonEmpty(education.title) && (
          <p>
            <strong>{education.title}</strong>
          </p>
        )}

        {isNonEmpty(education.trainingCenter) && (
          <p>
            <i>{education.trainingCenter}</i>
          </p>
        )}

        {isNonEmpty(education.graduationYear) && (
          <p>{education.graduationYear}</p>
        )}

        {isNonEmpty(education.comments) && <p>{education.comments}</p>}
      </div>

      {/* Right side: Cloud Manager (10%) */}
      <div style={{ flex: '0 0 20%' }}>
        <CloudAccessManager entry={education} />
      </div>
    </div>
  );
};
