import { useState } from "react";
import { useTypesConfig } from "../../contexts/TypesConfigHook"; // Adjust path
import axios from "../../axiosConfig"; // Adjust path
import { ApiPaths } from "../../apiPaths";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function CreateDocumentDialog({ open, onClose }: Props) {
  const cfg = useTypesConfig();
  const [selectedType, setSelectedType] = useState("");
  const [title, setTitle] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    setLoading(true);
    setError(null);

    try {
      const url = ApiPaths.DOC_PATH; // Adjust path if necessary
      await axios.post(url, {
        type: selectedType,
        title: title,
      });
      onClose();
      setSelectedType("");
      setTitle("");
    } catch (err: any) {
      setError(err?.response?.data?.message || "Failed to create document.");
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Create New Document</h2>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Document Type</label>
          <select
            className="w-full border border-gray-300 rounded-md p-2"
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
          >
            <option value="">Select a type</option>
            {cfg?.documentTypes?.map((type: string) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Document Title</label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded-md p-2"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter title"
          />
        </div>

        {error && <p className="text-red-600 text-sm mb-3">{error}</p>}

        <div className="flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-md border border-gray-300 hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={!selectedType || !title || loading}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}

