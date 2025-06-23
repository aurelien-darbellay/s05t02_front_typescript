import { useState } from "react";
import { EntryFieldConfig } from "../../model/EntryFieldConfig";
import { TypesConfig } from "../../model/TypesConfig";

interface EntryCreateDialogProps {
  open: boolean;
  onClose: () => void;
  cfg: TypesConfig;
  onSave: (entryData: any,setEntries:()=>void,docData:any) => void;
}

export default function EntryCreateDialog({
  open,
  onClose,
  cfg,
  onSave,
}: EntryCreateDialogProps) {
  const [selectedType, setSelectedType] = useState<string>("");
  const [entryValues, setEntryValues] = useState<Record<string, string>>({});
  const [error, setError] = useState<string | null>(null);

  const normalizeType = (key: string) => key.toLowerCase().replace(/\s/g, "");
  const selector = normalizeType(selectedType);
  const fields = EntryFieldConfig[selector] || [];

  const handleTypeChange = (type: string) => {
    setSelectedType(() => type);
    const newSelector = normalizeType(type);
    const initialValues = Object.fromEntries(
      (EntryFieldConfig[newSelector] || []).map((field) => [field, ""])
    );
    setEntryValues(initialValues);
    setError(null);
  };

  const handleInputChange = (key: string, value: string) => {
    setEntryValues((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    if (!selectedType) {
      setError("Please select an entry type.");
      return;
    }

    const entryData = {
      type: selectedType,
      ...entryValues,
    };

    //console.log("Saving entry data:", entryData);

    try {
      onSave(entryData);
      onClose();
      setSelectedType("");
      setEntryValues({});
      setError(null);
    } catch {
      setError("Failed to save entry.");
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md max-h-screen overflow-y-auto">
        <h2 className="text-xl font-semibold mb-4">Create New Entry</h2>

        {/* Entry Type Dropdown */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Entry Type</label>
          <select
            className="w-full border border-gray-300 rounded-md p-2"
            value={selectedType}
            onChange={(e) => handleTypeChange(e.target.value)}
          >
            <option value="">Select a type</option>
            {cfg.entryTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
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
              value={entryValues[field] || ""}
              onChange={(e) => handleInputChange(field, e.target.value)}
              placeholder={field}
            />
          </div>
        ))}

        {/* Error Message */}
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
            disabled={!selectedType}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

