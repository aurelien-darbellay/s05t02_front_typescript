import React from 'react';

interface UserTextInputDialogProps {
  open: boolean;
  label: string;
  value?: string;
  onChange: (newValue: string) => void;
  onCancel: () => void;
  onConfirm: () => void;
}

const UserTextInputDialog: React.FC<UserTextInputDialogProps> = ({
  open,
  label,
  onChange,
  onCancel,
  onConfirm,
  value = '',
}) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg max-w-sm w-full p-6">
        <h2 className="text-lg font-semibold mb-4">{label}</h2>
        <input
          type="text"
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Type answer here ..."
        />
        <div className="flex justify-end space-x-2 mt-4">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 transition"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserTextInputDialog;
