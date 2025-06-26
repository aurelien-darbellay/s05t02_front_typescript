import { useState, useEffect } from 'react';
import {
  EntryFieldConfig,
  EntryRestrictedTypes,
} from '../../../model/EntryFieldConfig';
import { TypesConfig } from '../../../model/TypesConfig';
import { ContainerEntry } from '../../../model/EntriesGeneralFeatures';
import { normalizeEntryData } from './normalizeEntryData';
import { EntryFieldInput } from './EntryFieldInput';
import { EntryTypesFormatter } from '../entryTypesFormatter';
import { ActionButton } from '../../ActionButton';

interface EntryCreateDialogProps {
  open: boolean;
  onClose: () => void;
  cfg: TypesConfig;
  onSave: (entryData: any, isNew: boolean) => void;
  onDelete: (entryData: any) => void;
  position: { xCord: number; yCord: number } | null;
  entries: ContainerEntry[];
  entryData?: ContainerEntry | null;
}

export default function EntryCreateDialog({
  open,
  onClose,
  cfg,
  onSave,
  onDelete,
  position,
  entries,
  entryData,
}: EntryCreateDialogProps) {
  const isEditing = !!entryData;
  const [selectedType, setSelectedType] = useState<string>('');
  const [entryValues, setEntryValues] = useState<Record<string, string>>({});
  const [color, setColor] = useState<string>('#000000');
  const [error, setError] = useState<string | null>(null);

  const restrictedTypes = [...EntryRestrictedTypes];

  const fields = EntryFieldConfig[selectedType] || [];

  useEffect(() => {
    if (entryData) {
      setSelectedType(entryData.keyNameInDB);
      setColor(entryData.color);
      const initValues = Object.fromEntries(
        (EntryFieldConfig[entryData.keyNameInDB] || []).map((field) => [
          field,
          entryData[field] || '',
        ])
      );
      setEntryValues(initValues);
    }
  }, [entryData]);

  const hasDuplicateRestrictedType =
    selectedType &&
    restrictedTypes.includes(selectedType) &&
    entries.some((entry) => entry.keyNameInDB === selectedType && !isEditing);

  const handleTypeChange = (type: string) => {
    //console.log(type);
    const formattedType = EntryTypesFormatter.fromDisplayToCamel(type);
    //console.log(formattedType);
    setSelectedType(formattedType);
    const newSelector = formattedType;
    const initialValues = Object.fromEntries(
      (EntryFieldConfig[newSelector] || []).map((field) => [field, ''])
    );
    setEntryValues(initialValues);
    setError(null);
  };

  const handleInputChange = (key: string, value: string) => {
    setEntryValues((prev) => ({ ...prev, [key]: value }));
  };

  const handleClose = () => {
    onClose();
    setSelectedType('');
    setEntryValues({});
    setColor('#000000');
    setError(null);
  };

  const handleSave = () => {
    if (!selectedType) {
      setError('Please select an entry type.');
      return;
    }
    if (hasDuplicateRestrictedType) {
      setError(`You already have an entry of type "${selectedType}"`);
      return;
    }

    const entryDataToSave = {
      ...entryData,
      type: selectedType,
      color,
      position: isEditing ? entryData?.position : position,
      ...entryValues,
    };
    //console.log('Entry data to save:', entryDataToSave);
    try {
      //console.log('Saving entry data:', normalizeEntryData(entryDataToSave));
      onSave(normalizeEntryData(entryDataToSave), !isEditing);
      onClose();
      setSelectedType('');
      setEntryValues({});
      setColor('#000000');
      setError(null);
      onClose();
      setSelectedType('');
      setEntryValues({});
      setColor('#000000');
      setError(null);
    } catch {
      setError('Failed to save entry.');
    }
  };

  const handleDelete = () => {
    if (!isEditing) {
      setError("You can't delete an entry you haven't created yet");
      return;
    }
    const entryToDelete = {
      ...entryData,
      type: selectedType,
      color,
      position: isEditing ? entryData?.position : position,
      ...entryValues,
    };
    try {
      //console.log('Saving entry data:', normalizeEntryData(entryDataToSave));
      onDelete(normalizeEntryData(entryToDelete));
      onClose();
      setSelectedType('');
      setEntryValues({});
      setColor('#000000');
      setError(null);
    } catch {
      setError('Failed to delete entry.');
    }
  };
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md max-h-screen overflow-y-auto">
        <h2 className="text-xl font-semibold mb-4">
          {isEditing ? 'Edit Entry' : 'Create New Entry'}
        </h2>

        {/* Entry Type Dropdown */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Entry Type</label>
          <select
            className="w-full border border-gray-300 rounded-md p-2"
            value={EntryTypesFormatter.fromCamelCaseToDisplay(selectedType)}
            onChange={(e) => handleTypeChange(e.target.value)}
            disabled={!!entryData} // Type is fixed during edit
          >
            <option value="">Select a type</option>
            {cfg.entryTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
          {hasDuplicateRestrictedType && (
            <p className="text-red-600 text-sm mt-1">
              Can't have more than one entry of type{' '}
              <strong>
                {EntryTypesFormatter.fromCamelCaseToDisplay(selectedType)}
              </strong>{' '}
              in your document.
            </p>
          )}
        </div>

        {/* Color Picker */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Color</label>
          <input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="w-full h-10 border border-gray-300 rounded-md"
          />
        </div>

        {/* Dynamic Input Fields */}
        {fields.map((field) => (
          <div className="mb-3" key={field}>
            <EntryFieldInput
              type={selectedType}
              field={field}
              value={entryValues[field] || ''}
              onChange={(value) => handleInputChange(field, value)}
            />
          </div>
        ))}

        {/* General Error Message */}
        {error && <p className="text-red-600 text-sm mb-3">{error}</p>}

        {/* Footer Buttons */}
        <div className="flex justify-end space-x-2 mt-4">
          <ActionButton
            onClick={handleDelete}
            value="Delete"
            color="red"
            disabled={!isEditing}
          />
          <ActionButton onClick={handleClose} value="Cancel" color="gray" />
          <ActionButton
            onClick={handleSave}
            value="Save"
            color="blue"
            disabled={!selectedType || hasDuplicateRestrictedType}
          />
        </div>
      </div>
    </div>
  );
}
