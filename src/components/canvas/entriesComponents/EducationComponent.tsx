// EducationComponent.tsx
// EducationComponent.tsx
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
    <div className="space-y-0">
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

      <CloudAccessManager entry={education} />
    </div>
  );
};
