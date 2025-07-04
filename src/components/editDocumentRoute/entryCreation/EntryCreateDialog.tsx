import { useState, useEffect, useContext } from 'react';
import {
  EntryFieldConfig,
  EntryContainerTypes,
} from '../../../model/EntriesConfig';
import { TypesConfig } from '../../../model/TypesConfig';
import { Entry } from '../../../model/EntriesGeneralFeatures';
import { normalizeEntryData } from './normalizeEntryData';
import { EntryFieldInput } from './EntryFieldInput';
import { EntryTypesFormatter } from '../../../model/entryTypesFormatter';
import { ActionButton } from '../../../utils/ActionButton';
import { EditEntryContext } from '../../../contexts/EditEntryContext';
import ProjectionToggler from '../ProjectionToggler';

interface EntryCreateDialogProps {
  open: boolean;
  onClose: () => void;
  cfg: TypesConfig;
  onDelete: (entryData: any) => void;
  position: { xCord: number; yCord: number } | null;
  entries: Entry[];
  entryData?: Entry | null;
}

export default function EntryCreateDialog({
  open,
  onClose,
  cfg,
  onDelete,
  position,
  entries,
  entryData,
}: EntryCreateDialogProps) {
  const isEditing = !!entryData;
  const [selectedType, setSelectedType] = useState<string>('');
  const [displayedType, setDisplayedType] = useState<string>('');
  const [entryValues, setEntryValues] = useState<Record<string, string>>({});
  const [color, setColor] = useState<string>('#000000');
  const [error, setError] = useState<string | null>(null);
  const {
    isList,
    setIsList,
    isListItem,
    setIsListItem,
    determineIfList,
    handleAddEntry,
  } = useContext(EditEntryContext);
  const onSave = handleAddEntry;
  const restrictedTypes = [...EntryContainerTypes];

  const fields = EntryFieldConfig[selectedType] || [];

  const hasDuplicateRestrictedType =
    selectedType &&
    restrictedTypes.includes(selectedType) &&
    entries.some((entry) => entry.type === selectedType && !isEditing);

  const handleTypeChange = (type: string) => {
    console.log(type);
    console.log(determineIfList(type));
    const formattedType = determineIfList(type)
      ? EntryTypesFormatter.fromDisplayToConstant('List ' + type)
      : EntryTypesFormatter.fromDisplayToConstant(type);
    console.log(formattedType);
    setSelectedType(formattedType);
    setDisplayedType(type);
    const newSelector = formattedType;
    const initialValues = Object.fromEntries(
      (EntryFieldConfig[newSelector] || []).map((field) => [field, ''])
    );
    setEntryValues(initialValues);
    setError(null);
    setIsListItem(false);
  };

  const handleInputChange = (key: string, value: string) => {
    setEntryValues((prev) => ({ ...prev, [key]: value }));
  };

  const handleClose = () => {
    onClose();
    setSelectedType('');
    setDisplayedType('');
    setIsList(false);
    setEntryValues({});
    setColor('#000000');
    setError(null);
    setIsListItem(false);
  };

  const getEntryPayload = () => ({
    ...entryData,
    type: selectedType,
    displayedType: displayedType,
    color,
    position: isEditing ? entryData?.position : position,
    ...entryValues,
  });

  const handleSave = () => {
    if (!selectedType) {
      setError('Please select an entry type.');
      return;
    }
    if (hasDuplicateRestrictedType) {
      setError(`You already have an entry of type "${selectedType}"`);
      return;
    }

    console.log('Entry data to save:', getEntryPayload());
    try {
      //console.log('Saving entry data:', normalizeEntryData(entryDataToSave));
      if (onSave)
        onSave(normalizeEntryData(getEntryPayload()) as Entry, isEditing);
      handleClose();
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
      displayedType: displayedType,
      color,
      position: isEditing ? entryData?.position : position,
      ...entryValues,
    };
    try {
      onDelete(normalizeEntryData(entryToDelete));
      handleClose();
    } catch {
      setError('Failed to delete entry.');
    }
  };

  useEffect(() => {
    if (entryData) {
      setSelectedType(entryData.type);
      setDisplayedType(entryData.displayedType);
      setColor(entryData.color);
      const initValues = Object.fromEntries(
        (EntryFieldConfig[entryData.type] || []).map((field) => [
          field,
          entryData[field] || '',
        ])
      );
      setEntryValues(initValues);
    }
  }, [entryData]);

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
            value={displayedType}
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
              {isList ? (
                <>
                  Can't have more than one list of type{' '}
                  <strong>{displayedType}</strong> in your document. To add a
                  list item of type <strong>{displayedType}</strong>, choose Add
                  Item.
                </>
              ) : (
                <>
                  Can't have more than one entry of type{' '}
                  <strong>{displayedType}</strong> in your document.
                </>
              )}
            </p>
          )}
        </div>

        {/* Color Picker */}
        {!isListItem && (
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Color</label>
            <input
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="w-full h-10 border border-gray-300 rounded-md"
            />
          </div>
        )}

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
          {isListItem && (
            <ProjectionToggler
              entry={getEntryPayload()}
              onClick={handleClose}
            />
          )}
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
          {isList && !isListItem && (
            <ActionButton
              onClick={() => {
                setSelectedType((prev) =>
                  EntryTypesFormatter.fromListToItem(prev)
                );
                setIsListItem(true);
              }}
              value="Add Item"
              color="black"
            />
          )}
        </div>
      </div>
    </div>
  );
}
