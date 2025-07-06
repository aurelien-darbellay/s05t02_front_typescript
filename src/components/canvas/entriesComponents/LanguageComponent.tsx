// LanguageComponent.tsx
import React from 'react';
import { Language, Level } from '../../../model/concreteEntries/Language';
import CloudAccessManager from '../../cloud/CloudAccessManager';

interface LanguageComponentProps {
  language: Language;
}

export const LanguageComponent: React.FC<LanguageComponentProps> = ({
  language,
}) => {
  return (
    <div>
      <p>
        <strong>Name:</strong> {language.name}
      </p>
      <p>
        <strong>Level:</strong> {Level[language.level]}
      </p>
      <CloudAccessManager entry={language} />
    </div>
  );
};
