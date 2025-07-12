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
    <div
      className="flex items-start gap-4"
      style={{
        width: '100%',
        alignItems: 'flex-start',
      }}
    >
      {/* Left side: 80% width */}
      <div style={{ flex: '0 0 70%' }}>
        {hasName && (
          <p>
            <strong>{language.name}</strong>
          </p>
        )}
        {hasLevel && (
          <p>
            <i>{Level[language.level]}</i>
          </p>
        )}
      </div>

      {/* Right side: 20% width */}
      <div style={{ flex: '0 0 30%' }}>
        <CloudAccessManager entry={language} />
      </div>
    </div>
  );
};
