// TechnicalSkillComponent.tsx
import React from 'react';
import { TechnicalSkill } from '../../model/concreteEntries/TechnicalSkill';

interface TechnicalSkillComponentProps {
  technicalSkill: TechnicalSkill;
}

export const TechnicalSkillComponent: React.FC<TechnicalSkillComponentProps> = ({ technicalSkill }) => {
  return (
    <div>
      <p><strong>Keywords:</strong> {technicalSkill.keyWords}</p>
      <h3>ContainedEntry Fields</h3>
      <p><strong>ID:</strong> {technicalSkill.id}</p>
      <p><strong>Projected:</strong> {technicalSkill.projected ? 'Yes' : 'No'}</p>
      <p><strong>Highlighted:</strong> {technicalSkill.highlighted ? 'Yes' : 'No'}</p>
    </div>
  );
};
