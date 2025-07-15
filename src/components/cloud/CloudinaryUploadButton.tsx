import { useContext, useRef, useState } from 'react';
import { ActionButton } from '../../utils/ActionButton';
import { createCloudinaryUploadHandler } from './createCloudinaryUploadHandler';
import { EditEntryContext } from '../../contexts/EditEntryContext';

const noopSetEditing: React.Dispatch<React.SetStateAction<boolean>> = () => {};

export default function CloudinaryUploadButton({
  size = 1,
  entry,
  value = 'Add file',
  isPicture,
  isEditing = false,
  setIsEditing = noopSetEditing,
  setIsEmptyMeta = noopSetEditing,
}) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [uploading, setUploading] = useState(false);
  const {
    addOrUpdateEntry,
    setUpdateUser,
    setUpdateUserMessage,
    setEntryDataInModif,
  } = useContext(EditEntryContext);

  const handleButtonClick = () => {
    if (uploading) return;
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = createCloudinaryUploadHandler({
    setUploading,
    addOrUpdateEntry,
    exposeError: setUpdateUser,
    setErrorMessage: setUpdateUserMessage,
    isPicture,
    isEditing,
    setIsEditing,
    setIsEmptyMeta,
    setEntryDataInModif,
  });

  // ✅ NEW wrapped onChange that checks size first
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      // > 10 MB
      setUpdateUser(true);
      setUpdateUserMessage('File too big (max 10 MB).');
      e.target.value = ''; // clear the input so user can re-select
      return;
    }

    // Otherwise, pass to existing handler
    handleFileChange(e, entry);
  };

  return (
    <div>
      <ActionButton
        onClick={handleButtonClick}
        disabled={uploading}
        color="purple"
        value={uploading ? 'Uploading...' : value}
        size={0.8 * size}
      />

      <input
        type="file"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleInputChange}
        accept="*/*"
      />
    </div>
  );
}
