// IdentityComponent.tsx
import React from 'react';
import { Identity } from '../../../model/concreteEntries/Identity';

interface IdentityComponentProps {
  identity: Identity;
}

export const IdentityComponent: React.FC<IdentityComponentProps> = ({
  identity,
}) => {
  const isNonEmptyArray = (arr?: string[] | null) =>
    Array.isArray(arr) &&
    arr.length > 0 &&
    arr.some((s) => s && s.trim() !== '');

  const hasNames = isNonEmptyArray(identity.names);
  const hasLastNames = isNonEmptyArray(identity.lastNames);

  const namesText = hasNames ? identity.names.join(' ') : '';
  const lastNamesText = hasLastNames ? identity.lastNames.join(' ') : '';

  return (
    <div className="space-y-1">
      {(hasNames || hasLastNames) && (
        <p>
          {hasNames && <span>{namesText}</span>}
          {hasNames && hasLastNames && ' '}
          {hasLastNames && <span>{lastNamesText}</span>}
        </p>
      )}
    </div>
  );
};
