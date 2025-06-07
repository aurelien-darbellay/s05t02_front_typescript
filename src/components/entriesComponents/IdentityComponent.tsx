// IdentityComponent.tsx
import React from 'react';
import { Identity } from '../../model/concreteEntries/Identity';

interface IdentityComponentProps {
  identity: Identity;
}

export const IdentityComponent: React.FC<IdentityComponentProps> = ({ identity }) => {
  return (
    <div>
      <p><strong>Names:</strong> {identity.names.join(' ')}</p>
      <p><strong>Last Names:</strong> {identity.lastNames.join(' ')}</p>

      <h3>ContainerEntry Fields</h3>
      <p><strong>Projected:</strong> {identity.projected ? 'Yes' : 'No'}</p>
      <p><strong>Highlighted:</strong> {identity.highlighted ? 'Yes' : 'No'}</p>
      <p>
        <strong>Position:</strong> x={identity.position.xCord}, y={identity.position.yCord}
      </p>
      <p><strong>Color:</strong> {identity.color}</p>
      <p><strong>Size:</strong> {identity.size}</p>
      <p>
        <strong>Previous Entry:</strong> projected={identity.previousEntry.projected ? 'Yes' : 'No'}
        , highlighted={identity.previousEntry.highlighted ? 'Yes' : 'No'}
      </p>
      <p>
        <strong>Next Entry:</strong> projected={identity.nextEntry.projected ? 'Yes' : 'No'}
        , highlighted={identity.nextEntry.highlighted ? 'Yes' : 'No'}
      </p>
    </div>
  );
};
