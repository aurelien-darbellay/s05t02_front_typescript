import { useContext } from 'react';
import { ApiPaths } from '../../apiPaths';
import axios from '../../axiosConfig';
import { ActionButton } from '../../utils/ActionButton';
import { EditEntryContext } from '../../contexts/EditEntryContext';
import { normalizeEntryData } from '../editDocumentRoute/entryCreation/normalizeEntryData';
import { Entry } from '../../model/EntriesGeneralFeatures';
import { deleteFileInCloudinary } from './deleteFileInCloudinary';

const CloudinaryDeleteButton = ({
  entry,
  size = 1,
  onClose,
  setIsEmptyMeta,
}) => {
  const {
    addOrUpdateEntry,
    setUpdateUser: exposeError,
    setUpdateUserMessage: setErrorMessage,
    setEntryDataInModif,
  } = useContext(EditEntryContext);
  const publicId = entry.documentCloudMetadata.id;
  //console.log(entry);
  const handleDelete = async () => {
    try {
      await deleteFileInCloudinary(publicId);
      const updatedEntry = {
        ...entry,
        cloudDocumentName: '',
        documentCloudMetadata: null,
      };
      if (addOrUpdateEntry)
        addOrUpdateEntry(normalizeEntryData(updatedEntry) as Entry, true);
      exposeError(true);
      setErrorMessage('File sucessfully deleted');
      onClose();
      setIsEmptyMeta(true);
      setEntryDataInModif(updatedEntry);
    } catch (e) {
      exposeError(true);
      setErrorMessage('Error deleting document: ' + (e as Error).message);
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
