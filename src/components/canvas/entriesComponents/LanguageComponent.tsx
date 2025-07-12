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
  const isNonEmpty = (value?: string | null) =>
    value !== undefined && value !== null && value !== '';

  const hasName = isNonEmpty(language.name);
  const hasLevel = language.level !== undefined && language.level !== null;

  return (
    <div className="space-y-1">
      {(hasName || hasLevel) && (
        <p>
          {hasName && language.name}
          {hasName && hasLevel && ' - '}
          {hasLevel && Level[language.level]}
        </p>
      )}

      <CloudAccessManager entry={language} />
    </div>
  );
};
