import { useContext } from 'react';
import { ApiPaths } from '../../apiPaths';
import axios from '../../axiosConfig';
import { ActionButton } from '../../utils/ActionButton';
import { EditEntryContext } from '../../contexts/EditEntryContext';
import { normalizeEntryData } from '../editDocumentRoute/entryCreation/normalizeEntryData';

const CloudinaryDeleteButton = ({ entry, size = 1, onClose }) => {
  const {
    addOrUpdateEntry,
    setUpdateUser: exposeError,
    setUpdateUserMessage: setErrorMessage,
  } = useContext(EditEntryContext);
  const publicId = entry.documentCloudMetadata.id;
  console.log(entry);
  const handleDelete = async () => {
    try {
      await axios.post(ApiPaths.CLOUD_DELETE_PATH, {
        publicId,
      });
      const updatedEntry = {
        ...entry,
        cloudDocumentName: '',
        documentCloudMetadata: null,
      };
      if (addOrUpdateEntry)
        addOrUpdateEntry(normalizeEntryData(updatedEntry), true);
      exposeError(true);
      setErrorMessage('File sucessfully deleted');
      onClose();
    } catch (e) {
      exposeError(true);
      setErrorMessage('Error deleting document: ' + e.message);
      onClose();
    }
  };

  return (
    <ActionButton
      onClick={handleDelete}
      value={'Delete'}
      color="red"
      size={0.8 * size}
    />
  );
};

export default CloudinaryDeleteButton;
