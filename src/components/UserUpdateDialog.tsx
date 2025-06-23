import React from "react";

interface UserUpdateDialogProps {
  open: boolean;
  message?: string;
  onClick: () => void;
}

const UserUpdateDialog: React.FC<UserUpdateDialogProps> = ({ open, message, onClick }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white border border-gray-300 rounded-xl shadow-lg p-6 max-w-sm w-full relative">
        <div className="text-gray-700 text-base mb-6">
          {message}
        </div>
        <div className="flex justify-end">
          <button
            onClick={onClick}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserUpdateDialog;
