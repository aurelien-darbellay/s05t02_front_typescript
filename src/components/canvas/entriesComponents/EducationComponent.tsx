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
  return (
    <div>
      <p>
        <strong>Title:</strong> {education.title}
      </p>
      <p>
        <strong>Training Center:</strong> {education.trainingCenter}
      </p>
      <p>
        <strong>Graduation Year:</strong> {education.graduationYear}
      </p>
      <p>
        <strong>Comments:</strong> {education.comments}
      </p>
      <CloudAccessManager entry={education} />
    </div>
  );
};
