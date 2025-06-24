import { useState, useEffect } from 'react';
import { EntryFieldConfig } from '../../model/EntryFieldConfig';
import { TypesConfig } from '../../model/TypesConfig';
import { ContainerEntry } from '../../model/EntriesGeneralFeatures';

interface EntryCreateDialogProps {
  open: boolean;
  onClose: () => void;
  cfg: TypesConfig;
  onSave: (entryData: any, isNew: boolean) => void;
  position: { xCord: number; yCord: number } | null;
  entries: ContainerEntry[];
  entryData?: ContainerEntry | null;
}

export default function EntryCreateDialog({
  open,
  onClose,
  cfg,
  onSave,
  position,
  entries,
  entryData,
}: EntryCreateDialogProps) {
  const isEditing = !!entryData;
  const [selectedType, setSelectedType] = useState<string>('');
  const [entryValues, setEntryValues] = useState<Record<string, string>>({});
  const [color, setColor] = useState<string>('#000000');
  const [error, setError] = useState<string | null>(null);

  const restrictedTypes = [
    'Contact',
    'Identity',
    'Profession',
    'Profile Picture',
    'Summary',
  ];

  const normalizeType = (key: string) => key.toLowerCase().replace(/\s/g, '');
  const selector = normalizeType(selectedType);
  const fields = EntryFieldConfig[selector] || [];

  useEffect(() => {
    if (entryData) {
      setSelectedType(entryData.displayedType);
      setColor(entryData.color);
      const selector = normalizeType(entryData.displayedType);
      const initValues = Object.fromEntries(
        (EntryFieldConfig[selector] || []).map((field) => [
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
    entries.some((entry) => entry.displayedType === selectedType && !isEditing);

  const handleTypeChange = (type: string) => {
    setSelectedType(type);
    const newSelector = normalizeType(type);
    const initialValues = Object.fromEntries(
      (EntryFieldConfig[newSelector] || []).map((field) => [field, ''])
    );
    setEntryValues(initialValues);
    setError(null);
  };

  const handleInputChange = (key: string, value: string) => {
    setEntryValues((prev) => ({ ...prev, [key]: value }));
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

    try {
      onSave(entryDataToSave, !isEditing);
      onClose();
      setSelectedType('');
      setEntryValues({});
      setColor('#000000');
      setError(null);
    } catch {
      setError('Failed to save entry.');
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
            value={selectedType}
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
              <strong>{selectedType}</strong> in your document.
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
            <label className="block text-sm font-medium mb-1 capitalize">
              {field}
            </label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-md p-2"
              value={entryValues[field] || ''}
              onChange={(e) => handleInputChange(field, e.target.value)}
              placeholder={field}
            />
          </div>
        ))}

        {/* General Error Message */}
        {error && <p className="text-red-600 text-sm mb-3">{error}</p>}

        {/* Footer Buttons */}
        <div className="flex justify-end space-x-2 mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-md border border-gray-300 hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={!selectedType || hasDuplicateRestrictedType}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
