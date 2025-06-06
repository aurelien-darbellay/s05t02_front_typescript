// ExperienceComponent.tsx
import React from 'react';
import { Experience } from '../../model/concreteEntries/Experience';

interface ExperienceComponentProps {
  experience: Experience;
}

export const ExperienceComponent: React.FC<ExperienceComponentProps> = ({ experience }) => {
  return (
    <div>
      <h2>Experience</h2>
      <p><strong>Position:</strong> {experience.position}</p>
      <p><strong>Company Name:</strong> {experience.nameCompany}</p>
      <p>
        <strong>Start Date:</strong> {experience.startDate.toDateString()}
      </p>
      <p>
        <strong>End Date:</strong> {experience.endDate.toDateString()}
      </p>
      <p><strong>Description:</strong> {experience.description}</p>
      <p><strong>Keywords:</strong> {experience.keywords.join(', ')}</p>
      <p><strong>Link Name:</strong> {experience.nameLink}</p>
      <p><strong>Link URL:</strong> <a href={experience.linkUrl}>{experience.linkUrl}</a></p>
      <p><strong>Cloud Document Name:</strong> {experience.cloudDocumentName}</p>
      <p>
        <strong>Cloud Metadata:</strong> {JSON.stringify(experience.documentCloudMetadata)}
      </p>

      <h3>ContainedEntry Fields</h3>
      <p><strong>ID:</strong> {experience.id}</p>
      <p><strong>Projected:</strong> {experience.projected ? 'Yes' : 'No'}</p>
      <p><strong>Highlighted:</strong> {experience.highlighted ? 'Yes' : 'No'}</p>
    </div>
  );
};
