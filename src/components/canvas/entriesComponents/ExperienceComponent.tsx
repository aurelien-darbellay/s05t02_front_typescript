import React from 'react';
import { Experience } from '../../../model/concreteEntries/Experience';
import CloudAccessManager from '../../cloud/CloudAccessManager';

interface ExperienceComponentProps {
  experience: Experience;
}

export const ExperienceComponent: React.FC<ExperienceComponentProps> = ({
  experience,
}) => {
  const isNonEmpty = (value?: string | number | null) =>
    value !== undefined && value !== null && value !== '';

  const formatDate = (date: Date) =>
    `${String(date.getMonth() + 1).padStart(2, '0')}/${date.getFullYear()}`;

  const hasStart = !!experience.startDate;
  const hasEnd = !!experience.endDate;

  let dateLine = '';
  if (hasStart && hasEnd) {
    dateLine = `${formatDate(experience.startDate)} - ${formatDate(experience.endDate)}`;
  } else if (hasStart) {
    dateLine = `${formatDate(experience.startDate)} -`;
  } else if (hasEnd) {
    dateLine = `- ${formatDate(experience.endDate)}`;
  }

  return (
    <div
      className="flex items-start gap-4"
      style={{
        width: '100%',
        alignItems: 'flex-start',
      }}
    >
      {/* Left side: 80% width */}
      <div style={{ flex: '0 0 70%' }}>
        {isNonEmpty(experience.role) && (
          <p>
            <strong>{experience.role}</strong>
          </p>
        )}

        {isNonEmpty(experience.nameCompany) && (
          <p>
            <i>{experience.nameCompany}</i>
          </p>
        )}

        {dateLine && <p>{dateLine}</p>}

        {isNonEmpty(experience.description) && (
          <p style={{ fontSize: '0.9em' }}>{experience.description}</p>
        )}

        {experience.keywords && experience.keywords.length > 0 && (
          <p>{experience.keywords}</p>
        )}

        {isNonEmpty(experience.nameLink) && isNonEmpty(experience.linkUrl) && (
          <p>
            <a
              href={experience.linkUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-purple-600 underline hover:text-purple-800"
            >
              {experience.nameLink}
            </a>
          </p>
        )}
      </div>

      {/* Right side: 20% width */}
      <div style={{ flex: '0 0 30%' }}>
        <CloudAccessManager entry={experience} />
      </div>
    </div>
  );
};
