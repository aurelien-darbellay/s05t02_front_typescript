// TechnicalSkillComponent.tsx
import React from 'react';
import { TechnicalSkill } from '../../../model/concreteEntries/TechnicalSkill';

interface TechnicalSkillComponentProps {
  technicalSkill: TechnicalSkill;
}

export const TechnicalSkillComponent: React.FC<
  TechnicalSkillComponentProps
> = ({ technicalSkill }) => {
  return (
    <div>
      <p>
        <strong>Keywords:</strong> {technicalSkill.keyWords}
      </p>
    </div>
  );
};
