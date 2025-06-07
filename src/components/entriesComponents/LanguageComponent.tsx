// LanguageComponent.tsx
import React from 'react';
import { Language, Level } from '../../model/concreteEntries/Language';

interface LanguageComponentProps {
  language: Language;
}

export const LanguageComponent: React.FC<LanguageComponentProps> = ({ language }) => {
  return (
    <div>
      <p><strong>Name:</strong> {language.name}</p>
      <p><strong>Level:</strong> {Level[language.level]}</p>
      <p><strong>Cloud Document Name:</strong> {language.cloudDocumentName}</p>
      <p>
        <strong>Cloud Metadata:</strong> {JSON.stringify(language.documentCloudMetadata)}
      </p>

      <h3>ContainedEntry Fields</h3>
      <p><strong>ID:</strong> {language.id}</p>
      <p><strong>Projected:</strong> {language.projected ? 'Yes' : 'No'}</p>
      <p><strong>Highlighted:</strong> {language.highlighted ? 'Yes' : 'No'}</p>
    </div>
  );
};
