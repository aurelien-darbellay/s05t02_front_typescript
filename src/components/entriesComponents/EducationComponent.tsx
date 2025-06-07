// EducationComponent.tsx
import React from 'react';
import { Education } from '../../model/concreteEntries/Education';

interface EducationComponentProps {
  education: Education;
}

export const EducationComponent: React.FC<EducationComponentProps> = ({ education }) => {
  return (
    <div>
      <p><strong>Title:</strong> {education.title}</p>
      <p><strong>Training Center:</strong> {education.trainingCenter}</p>
      <p><strong>Graduation Year:</strong> {education.graduationYear}</p>
      <p><strong>Comments:</strong> {education.comments}</p>
      <p><strong>Cloud Document Name:</strong> {education.cloudDocumentName}</p>
      <p>
        <strong>Cloud Metadata:</strong> {JSON.stringify(education.documentCloudMetadata)}
      </p>

      <h3>ContainedEntry Fields</h3>
      <p><strong>ID:</strong> {education.id}</p>
      <p><strong>Projected:</strong> {education.projected ? 'Yes' : 'No'}</p>
      <p><strong>Highlighted:</strong> {education.highlighted ? 'Yes' : 'No'}</p>
    </div>
  );
};
