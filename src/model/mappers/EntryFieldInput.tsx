// components/EntryFieldInput.tsx
import React from 'react';
import { useGetInputType } from './getInputType';
import { EntryTypesFormatter } from '../entryTypesFormatter';
import CloudAccessManager from '../../components/cloud/CloudAccessManager';
import { PointsToFileInCloud } from '../EntriesGeneralFeatures';

interface EntryFieldInputProps {
  field: string;
  value: any;
  onChange: (value: string) => void;
  type: string;
  entryData: Record<string, any> | null;
}

export const EntryFieldInput: React.FC<EntryFieldInputProps> = ({
  field,
  value,
  onChange,
  type,
  entryData,
}) => {
  //console.log('Field ', field);
  //console.log('Value ', value);
  const getInputType = useGetInputType();
  const inputType = getInputType(type, field);
  //console.log(field);
  //console.log(value);
  const getLabel = (field: string): string => {
    if (field === 'documentCloudMetadata') return '';
    else return EntryTypesFormatter.fromCamelCaseToDisplay(field);
  };
  const label = getLabel(field);
  const commonClasses = 'border border-gray-300 rounded-md p-2';
  if (inputType.kind === 'ignore') {
    return '';
  }
  return (
    <div className="mb-3 w-[380px]">
      <label className="block text-sm font-medium mb-1">{label}</label>

      {inputType.kind === 'select' && (
        <select
          className={`${commonClasses} w-full`}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        >
          <option value="">Select...</option>
          {inputType.options.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      )}

      {inputType.kind === 'textarea' && (
        <textarea
          className={`${commonClasses} w-full`}
          value={value}
          maxLength={inputType.maxLength}
          onChange={(e) => onChange(e.target.value)}
        />
      )}

      {inputType.kind === 'cloudMetadata' && inputType.type === 'else' && (
        <CloudAccessManager
          entry={entryData as PointsToFileInCloud}
          size={1.2}
        />
      )}

      {inputType.kind === 'cloudMetadata' &&
        inputType.type === 'profile_picture' && (
          <CloudAccessManager
            entry={entryData as PointsToFileInCloud}
            size={1.2}
          />
        )}

      {inputType.kind !== 'textarea' &&
        inputType.kind !== 'select' &&
        inputType.kind !== 'custom' &&
        inputType.kind !== 'cloudMetadata' && (
          <input
            type={inputType.kind}
            className={`${commonClasses} w-full`}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={label}
          />
        )}
    </div>
  );
};
