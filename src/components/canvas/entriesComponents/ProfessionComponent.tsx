// ProfessionComponent.tsx
import React from 'react';
import { Profession } from '../../../model/concreteEntries/Profession';

interface ProfessionComponentProps {
  profession: Profession;
}

export const ProfessionComponent: React.FC<ProfessionComponentProps> = ({
  profession,
}) => {
  const isNonEmpty = (value?: string | null) =>
    value !== undefined && value !== null && value !== '';

  const hasGeneral = isNonEmpty(profession.generalTitle);
  const hasSpecific = isNonEmpty(profession.specificTitle);

  return (
    <div className="space-y-0">
      {hasGeneral && (
        <p style={{ textAlign: 'center' }}>
          <strong>{profession.generalTitle.toUpperCase()}</strong>
        </p>
      )}
      {hasSpecific && <i>{profession.specificTitle}</i>}
    </div>
  );
};
