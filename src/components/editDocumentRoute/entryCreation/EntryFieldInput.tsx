// components/EntryFieldInput.tsx
import React from 'react';
import { useGetInputType } from '../../../model/mappers/getInputType';
import { CloudinaryMetaInput } from './CloudinaryMetaInput';
import { EntryTypesFormatter } from '../../../model/entryTypesFormatter';

interface EntryFieldInputProps {
  field: string;
  value: string;
  onChange: (value: string) => void;
  type: string;
}

export const EntryFieldInput: React.FC<EntryFieldInputProps> = ({
  field,
  value,
  onChange,
  type,
}) => {
  const getInputType = useGetInputType();
  const inputType = getInputType(type, field);

  const label = EntryTypesFormatter.fromCamelCaseToDisplay(field);
  const commonClasses = 'border border-gray-300 rounded-md p-2';

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

      {inputType.kind === 'custom' && inputType.component === 'cloudinary' && (
        <CloudinaryMetaInput value={value} />
      )}

      {inputType.kind !== 'textarea' &&
        inputType.kind !== 'select' &&
        inputType.kind !== 'custom' && (
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
