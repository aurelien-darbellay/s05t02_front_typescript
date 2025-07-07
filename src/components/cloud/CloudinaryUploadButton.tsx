import { useContext, useRef, useState } from 'react';
import { ActionButton } from '../../utils/ActionButton';
import { createCloudinaryUploadHandler } from './createCloudinaryUploadHandler';
import { EditEntryContext } from '../../contexts/EditEntryContext';

export default function CloudinaryUploadButton({
  size = 1,
  entry,
  value = 'Add file',
}) {
  const fileInputRef = useRef(null);
  const [uploading, setUploading] = useState(false);
  const { addOrUpdateEntry, setUpdateUser, setUpdateUserMessage } =
    useContext(EditEntryContext);

  const handleButtonClick = () => {
    if (uploading) return;
    fileInputRef.current.click();
  };

  const handleFileChange = createCloudinaryUploadHandler({
    setUploading,
    addOrUpdateEntry,
    exposeError: setUpdateUser,
    setErrorMessage: setUpdateUserMessage,
  });

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
        onChange={(e) => handleFileChange(e, entry)}
        accept="*/*"
      />
    </div>
  );
}
