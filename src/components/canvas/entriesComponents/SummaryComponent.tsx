// SummaryComponent.tsx
import React from 'react';
import { Summary } from '../../../model/concreteEntries/Summary';

interface SummaryComponentProps {
  summary: Summary;
}

export const SummaryComponent: React.FC<SummaryComponentProps> = ({ summary }) => {
  return (
    <div>
      <p><strong>Title:</strong> {summary.title}</p>
      <p><strong>Text:</strong> {summary.text}</p>
    </div>
  );
};
