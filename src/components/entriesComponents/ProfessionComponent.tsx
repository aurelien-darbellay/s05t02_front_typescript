// ProfessionComponent.tsx
import React from 'react';
import { Profession } from '../../model/concreteEntries/Profession';

interface ProfessionComponentProps {
  profession: Profession;
}

export const ProfessionComponent: React.FC<ProfessionComponentProps> = ({ profession }) => {
  return (
    <div>
      <p><strong>General Title:</strong> {profession.generalTitle}</p>
      <p><strong>Specific Title:</strong> {profession.specificTitle}</p>
    </div>
  );
};
