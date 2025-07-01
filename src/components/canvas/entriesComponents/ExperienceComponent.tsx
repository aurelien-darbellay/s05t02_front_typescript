// ExperienceComponent.tsx
import React from 'react';
import { Experience } from '../../../model/concreteEntries/Experience';

interface ExperienceComponentProps {
  experience: Experience;
}

export const ExperienceComponent: React.FC<ExperienceComponentProps> = ({
  experience,
}) => {
  return (
    <div>
      <p>
        <strong>Role:</strong> {experience.role}
      </p>
      <p>
        <strong>Company Name:</strong> {experience.nameCompany}
      </p>
      <p>
        <strong>Start Date:</strong> {experience.startDate.toDateString()}
      </p>
      <p>
        <strong>End Date:</strong> {experience.endDate.toDateString()}
      </p>
      <p>
        <strong>Description:</strong> {experience.description}
      </p>
      {experience.keywords && (
        <p>
          <strong>Keywords:</strong> {experience.keywords.join(', ')}
        </p>
      )}
      <p>
        <strong>Link Name:</strong> {experience.nameLink}
      </p>
      <p>
        <strong>Link URL:</strong>{' '}
        <a href={experience.linkUrl}>{experience.linkUrl}</a>
      </p>
      <p>Certificate {experience.cloudDocumentName}</p>
    </div>
  );
};
