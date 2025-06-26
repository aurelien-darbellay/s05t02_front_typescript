// SoftSkillComponent.tsx
import React from 'react';
import { SoftSkill } from '../../../model/concreteEntries/SoftSkill';

interface SoftSkillComponentProps {
  softSkill: SoftSkill;
}

export const SoftSkillComponent: React.FC<SoftSkillComponentProps> = ({
  softSkill,
}) => {
  return (
    <div>
      <p>
        <strong>Keywords:</strong> {softSkill.keyWords}
      </p>
    </div>
  );
};
