// TechnicalSkillComponent.tsx
import React from 'react';
import { TechnicalSkill } from '../../../model/concreteEntries/TechnicalSkill';

interface TechnicalSkillComponentProps {
  technicalSkill: TechnicalSkill;
}

export const TechnicalSkillComponent: React.FC<
  TechnicalSkillComponentProps
> = ({ technicalSkill }) => {
  // Utility to capitalize each word
  const capitalizeWords = (text: string) =>
    text
      .split(' ')
      .map((word) =>
        word.length > 0
          ? word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
          : ''
      )
      .join(' ');
  return <span>{capitalizeWords(technicalSkill.keyWords)}</span>;
};
