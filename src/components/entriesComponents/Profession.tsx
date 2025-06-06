// ProfessionComponent.tsx
import React from 'react';
import { Profession } from '../../model/concreteEntries/Profession';

interface ProfessionComponentProps {
  profession: Profession;
}

export const ProfessionComponent: React.FC<ProfessionComponentProps> = ({ profession }) => {
  return (
    <div>
      <h2>Profession</h2>
      <p><strong>General Title:</strong> {profession.generalTitle}</p>
      <p><strong>Specific Title:</strong> {profession.specificTitle}</p>

      <h3>ContainerEntry Fields</h3>
      <p><strong>Projected:</strong> {profession.projected ? 'Yes' : 'No'}</p>
      <p><strong>Highlighted:</strong> {profession.highlighted ? 'Yes' : 'No'}</p>
      <p>
        <strong>Position:</strong> x={profession.position.xCord}, y={profession.position.yCord}
      </p>
      <p><strong>Color:</strong> {profession.color}</p>
      <p><strong>Size:</strong> {profession.size}</p>
      <p>
        <strong>Previous Entry:</strong> projected={profession.previousEntry.projected ? 'Yes' : 'No'}
        , highlighted={profession.previousEntry.highlighted ? 'Yes' : 'No'}
      </p>
      <p>
        <strong>Next Entry:</strong> projected={profession.nextEntry.projected ? 'Yes' : 'No'}
        , highlighted={profession.nextEntry.highlighted ? 'Yes' : 'No'}
      </p>
    </div>
  );
};
