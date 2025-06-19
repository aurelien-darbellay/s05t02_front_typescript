// SoftSkillComponent.tsx
import React from 'react';
import { SoftSkill } from '../../../model/concreteEntries/SoftSkill';

interface SoftSkillComponentProps {
  softSkill: SoftSkill;
}

export const SoftSkillComponent: React.FC<SoftSkillComponentProps> = ({ softSkill }) => {
  return (
    <div>
      <p><strong>Keywords:</strong> {softSkill.keyWords}</p>

      <h3>ContainedEntry Fields</h3>
      <p><strong>ID:</strong> {softSkill.id}</p>
      <p><strong>Projected:</strong> {softSkill.projected ? 'Yes' : 'No'}</p>
      <p><strong>Highlighted:</strong> {softSkill.highlighted ? 'Yes' : 'No'}</p>
    </div>
  );
};
