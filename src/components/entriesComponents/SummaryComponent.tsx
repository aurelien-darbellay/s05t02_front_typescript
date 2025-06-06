// SummaryComponent.tsx
import React from 'react';
import { Summary } from '../../model/concreteEntries/Summary';

interface SummaryComponentProps {
  summary: Summary;
}

export const SummaryComponent: React.FC<SummaryComponentProps> = ({ summary }) => {
  return (
    <div>
      <h2>Summary</h2>
      <p><strong>Title:</strong> {summary.title}</p>
      <p><strong>Text:</strong> {summary.text}</p>

      <h3>ContainerEntry Fields</h3>
      <p><strong>Projected:</strong> {summary.projected ? 'Yes' : 'No'}</p>
      <p><strong>Highlighted:</strong> {summary.highlighted ? 'Yes' : 'No'}</p>
      <p>
        <strong>Position:</strong> x={summary.position.xCord}, y={summary.position.yCord}
      </p>
      <p><strong>Color:</strong> {summary.color}</p>
      <p><strong>Size:</strong> {summary.size}</p>
      <p>
        <strong>Previous Entry:</strong> projected={summary.previousEntry.projected ? 'Yes' : 'No'}
        , highlighted={summary.previousEntry.highlighted ? 'Yes' : 'No'}
      </p>
      <p>
        <strong>Next Entry:</strong> projected={summary.nextEntry.projected ? 'Yes' : 'No'}
        , highlighted={summary.nextEntry.highlighted ? 'Yes' : 'No'}
      </p>
    </div>
  );
};
