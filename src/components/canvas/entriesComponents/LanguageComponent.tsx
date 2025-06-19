// LanguageComponent.tsx
import React from 'react';
import { Language, Level } from '../../../model/concreteEntries/Language';

interface LanguageComponentProps {
  language: Language;
}

export const LanguageComponent: React.FC<LanguageComponentProps> = ({ language }) => {
  return (
    <div>
      <p><strong>Name:</strong> {language.name}</p>
      <p><strong>Level:</strong> {Level[language.level]}</p>
      <p>Certificate {language.cloudDocumentName}</p>
    </div>
  );
};
