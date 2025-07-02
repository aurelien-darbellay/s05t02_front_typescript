import { useSearchParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useTypesConfig } from '../contexts/TypesConfigHook';
import { Canvas } from './canvas/Canvas';
import axios from '../axiosConfig';
import { ApiPaths } from '../apiPaths';
import { ActionButton } from './ActionButton';
import { fetchDocData } from '../helpers/generalFetchers';
import { UserUpdateDialog } from './UserUpdateDialog';
import { UnprojectedEntriesShelf } from './UnprojectedEntriesShelf';
import { mapDocDataToEntries } from '../model/mappers/mapDocDataToEntries';
import {
  createHandleAddEntry,
  createHandleDeleteEntry,
} from './CreateDeleteEntries';

const EditDocumentView: React.FC = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get('id');
  const navigate = useNavigate();
  const initialConfig = useTypesConfig();
  const [config, setConfig] = useState(initialConfig);
  const [initialDocData, setInitialDocData] = useState<any>(null);
  const [updatedDocData, setUpdatedDocData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [updateUser, setUpdateUser] = useState(false);
  const [updateUserMessage, setUpdateUserMessage] = useState('');
  const listEntries = mapDocDataToEntries(updatedDocData);
  const [entries, setEntries] = useState<ContainerEntry[]>(listEntries);

  useEffect(() => {
    const fetchDocument = async () => {
      try {
        if (!id) throw new Error("can't fetch doc data without defined id");
        const response = await fetchDocData(id);
        //console.log('Document data fetched:', response.data);
        setInitialDocData(response.data);
        setUpdatedDocData(response.data); // Initialize updatedDocData with fetched data
      } catch (err: any) {
        const message =
          err.response?.data?.message || err.message || 'Unknown error';
        setError('Failed to load document: ' + message);
      }
    };
    fetchDocument();
  }, [id]);

  useEffect(() => {
    //console.log('DocData updated: ', updatedDocData);
  }, [updatedDocData]);

  const handleSave = async () => {
    if (!initialDocData || !id) return;
    try {
      const url = ApiPaths.DOC_ID_PATH.replace('{docId}', id);
      await axios.post(url, updatedDocData, { withCredentials: true });
      setUpdateUserMessage('Document saved successfully!');
    } catch (err: any) {
      const message =
        err.response?.data?.message || err.message || 'Unknown error';
      setUpdateUserMessage('Failed to save document: ' + message);
    }
    setUpdateUser(true);
  };

  const handleAddEntry = createHandleAddEntry(
    updatedDocData?.id,
    setEntries,
    setUpdateUser,
    setUpdateUserMessage
  );

  const handleDeleteEntry = createHandleDeleteEntry(
    updatedDocData?.id,
    setEntries,
    setUpdateUser,
    setUpdateUserMessage
  );

  const closeUserUpdateDialog = () => {
    setUpdateUser(false);
    setUpdateUserMessage('');
  };

  if (error) return <p style={{ color: 'red' }}>{error}</p>;
  if (!initialDocData) return <p>Loading document...</p>;

  return (
    <div className="relative w-full min-h-screen">
      {/* Header stays scrollable with content */}
      <div className="relative bg-white border-b border-gray-300 flex p-6 gap-4">
        <ActionButton
          onClick={() => navigate('/user')}
          value="Back to Dashboard"
          color="#007bff"
        />
        <ActionButton onClick={handleSave} value="Save" color="#28a745" />
        <ActionButton
          onClick={() => setDialogOpen(true)}
          value="Add Entry"
          color="#28a745"
        />
      </div>

      {/* Canvas grows with content and scrolls normally */}
      <div className="w-full flex">
        <div className="w-1/7">
          <UnprojectedEntriesShelf docData={updatedDocData} />
        </div>
        <div className="w-6/7 bg-gray-100">
          <Canvas
            docData={initialDocData}
            entries={entries}
            setEntries={setEntries}
            cfg={config}
            setDocData={setUpdatedDocData}
            dialogOpen={dialogOpen}
            setDialogOpen={setDialogOpen}
            handleAddEntry={handleAddEntry}
            handleDeleteEntry={handleDeleteEntry}
          />
        </div>
      </div>
      <UserUpdateDialog
        open={updateUser}
        message={updateUserMessage}
        onClick={closeUserUpdateDialog}
      />
    </div>
  );
};

export default EditDocumentView;
