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
    </div>
  );
};
