// SummaryComponent.tsx
import React from 'react';
import { Summary } from '../../../model/concreteEntries/Summary';

interface SummaryComponentProps {
  summary: Summary;
}

export const SummaryComponent: React.FC<SummaryComponentProps> = ({
  summary,
}) => {
  const isNonEmpty = (value?: string | null) =>
    value !== undefined && value !== null && value !== '';

  return (
    <div className="space-y-1">
      {isNonEmpty(summary.title) && (
        <p className="text-center font-bold">{summary.title}</p>
      )}

      {isNonEmpty(summary.text) && (
        <p className="text-justify">{summary.text}</p>
      )}
    </div>
  );
};
