import { useSearchParams, useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useTypesConfig } from '../contexts/TypesConfigHook';
import axios from '../axiosConfig';
import { ApiPaths } from '../apiPaths';
import { ActionButton } from '../utils/ActionButton';
import { fetchDocData } from '../utils/generalFetchers';
import Editor from './editDocumentRoute/Editor';
import { UserUpdateDialog } from '../utils/UserUpdateDialog';
import UserTextInputDialog from '../utils/UserTextInputDialog';

const EditDocumentView: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [actingUser] = useState<string | null>(() => {
    const acting = sessionStorage.getItem('actingUser');
    const real = localStorage.getItem('username');
    if (acting && !(acting == real)) return acting;
    return null;
  });
  const id = searchParams.get('id');
  const location = useLocation();
  const { username } = location.state || {};
  const navigate = useNavigate();
  const initialConfig = useTypesConfig();
  const [config] = useState(initialConfig);
  const [initialDocData, setInitialDocData] = useState<any>(null);
  const [updatedDocData, setUpdatedDocData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [updateUser, setUpdateUser] = useState(false);
  const [updateUserMessage, setUpdateUserMessage] = useState('');
  const [isPvDialogOpen, setIsPvDialogOpen] = useState(false);
  const [pvId, setPvId] = useState('');
  const [connectMode, setConnectMode] = useState(false);
  const [connectOriginId, setConnectOriginId] = useState<string | null>(null);

  useEffect(() => {
    const fetchDocument = async () => {
      try {
        if (!id) throw new Error("can't fetch doc data without defined id");
        const response = await fetchDocData(id, actingUser);
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

  const handleSave = async (dataToSave = updatedDocData) => {
    if (!initialDocData || !id) return;
    try {
      const url = ApiPaths.DOC_ID_PATH.replace('{docId}', id);
      await axios.post(url, dataToSave);
      setUpdateUserMessage('Document saved successfully!');
    } catch (err: any) {
      const message =
        err.response?.data?.message || err.message || 'Unknown error';
      setUpdateUserMessage('Failed to save document: ' + message);
    }
    setUpdateUser(true);
  };
  const pickPublicViewId = () => setIsPvDialogOpen(true);
  const createPublicView = async () => {
    const usernameInId = username.toLowerCase().replace(/\s/g, '-');
    setIsPvDialogOpen(false);
    const url = ApiPaths.PV_PATH.replace('{pvId}', usernameInId + '-' + pvId);
    try {
      const response = await axios.post(url, updatedDocData, {
        withCredentials: true,
      });
      const id = response.data.id;
      const message = `Your public view has been created. You can consult it by visiting: localhost:5173/public/${id}`;
      setUpdateUser(true);
      setUpdateUserMessage(message);
    } catch (error) {
      setUpdateUser(true);
      setUpdateUserMessage((error as Error).message);
    }
  };

  const closeUserUpdateDialog = () => {
    setUpdateUser(false);
    setUpdateUserMessage('');
  };

  const printPdf = async () => {
    const url = ApiPaths.USER_GENERATE_PDF_PATH;
    try {
      const response = await axios.post(url, updatedDocData, {
        responseType: 'blob', // Ensure you get binary
      });
      //console.log(response.data);

      // Create a blob URL
      const blob = new Blob([response.data], { type: 'application/pdf' });
      const urlBlob = window.URL.createObjectURL(blob);

      // Create a temporary link to download
      const link = document.createElement('a');
      link.href = urlBlob;
      link.download = 'new-generated-doc.pdf';
      document.body.appendChild(link);
      link.click();

      // Clean up
      document.body.removeChild(link);
      window.URL.revokeObjectURL(urlBlob);
    } catch {
      setUpdateUser(true);
      setUpdateUserMessage('Error printing pdf:');
    }
  };

  function clearAllConnectionsInDocData(docData: any): any {
    if (!docData) return docData;

    const newDocData = { ...docData };

    // Go through each top-level field in the document
    for (const key of Object.keys(newDocData)) {
      const entry = newDocData[key];

      // We only want to touch top-level entries that are objects with id
      if (entry && typeof entry === 'object' && entry.id) {
        newDocData[key] = {
          ...entry,
          nextEntry: null,
          previousEntry: null,
        };
      }
    }

    return newDocData;
  }

  const handleClearConnections = () => {
    if (!updatedDocData) return;

    // Make the cleared copy
    const cleared = clearAllConnectionsInDocData(updatedDocData);

    // Update local state so Editor re-renders
    setInitialDocData(cleared);
    setUpdatedDocData(cleared);

    // Immediately save to backend
    handleSave(cleared);
  };

  if (error) return <p style={{ color: 'red' }}>{error}</p>;
  if (!initialDocData) return <p>Loading document...</p>;

  return (
    <div className="relative w-full min-h-screen">
      {/* Header stays scrollable with content */}
      <div className="relative bg-white border-b border-gray-300 flex p-6 gap-4 mt-3 mb-3 shadow-md rounded-sm">
        <ActionButton
          onClick={() => navigate('/user')}
          value="Back to Dashboard"
          color="#0e4785ff"
        />
        <ActionButton
          onClick={() => handleSave()}
          value="Save"
          color="#23b144ff"
          disabled={!!actingUser}
        />
        <ActionButton
          onClick={() => setDialogOpen(true)}
          value="Add Entry"
          color="#de7ff1ff"
          text="black"
          disabled={!!actingUser}
        />
        <ActionButton
          onClick={() => setConnectMode((prev) => !prev)}
          value={connectMode ? 'Connecting ...' : 'Connect Entries'}
          color={connectMode ? 'red' : 'orange'}
          text={connectMode ? 'white' : 'black'}
          disabled={!!actingUser}
        />
        <ActionButton
          onClick={handleClearConnections}
          value="Clear Connections"
          color="red"
          disabled={!!actingUser}
        />

        <ActionButton
          onClick={pickPublicViewId}
          value="Create Public View"
          color="purple"
          disabled={!!actingUser}
        />
        <ActionButton
          onClick={printPdf}
          value="Print Pdf"
          color="rgb(233,28,188)"
          disabled={!!actingUser}
        />
      </div>

      {/* Canvas grows with content and scrolls normally */}
      <Editor
        docData={initialDocData}
        setDocData={setUpdatedDocData}
        cfg={config}
        dialogOpen={dialogOpen}
        setDialogOpen={setDialogOpen}
        setUpdateUser={setUpdateUser}
        setUpdateUserMessage={setUpdateUserMessage}
        editable={!actingUser}
        connectMode={connectMode}
        setConnectMode={setConnectMode}
        connectOriginId={connectOriginId}
        setConnectOriginId={setConnectOriginId}
      />
      <UserUpdateDialog
        open={updateUser}
        message={updateUserMessage}
        onClick={closeUserUpdateDialog}
      />
      <UserTextInputDialog
        open={isPvDialogOpen}
        label="Chose an identifier for your public view"
        onChange={(newValue) => setPvId(newValue)}
        onCancel={() => {
          setPvId('');
          setIsPvDialogOpen(false);
        }}
        onConfirm={createPublicView}
        value={pvId}
      />
    </div>
  );
};

export default EditDocumentView;
