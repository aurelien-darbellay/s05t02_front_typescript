import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../axiosConfig';
import { ApiPaths } from '../apiPaths';
import { mapDocDataToEntries } from '../model/mappers/mapDocDataToEntries';
import { ContainerEntry } from '../model/EntriesGeneralFeatures';
import { Canvas } from '../components/canvas/Canvas';
import { UserUpdateDialog } from '../utils/UserUpdateDialog';
import { EditEntryContext } from '../contexts/EditEntryContext';
import { playDocument } from './canvas/playDocument';
import { isTotallyOrdered } from './canvas/isTotallyOrdered';

const PublicDocumentView: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const [entries, setEntries] = useState<ContainerEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [updateUser, setUpdateUser] = useState(false);
  const [updateUserMessage, setUpdateUserMessage] = useState('');

  const closeUserUpdateDialog = () => {
    setUpdateUser(false);
    setUpdateUserMessage('');
  };

  useEffect(() => {
    if (!id) return;
    //console.log('About to fectch id:', id);

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await axios.get(
          `${ApiPaths.PUBLIC_VIEWS_PATH}?id=${id}`
        );
        //console.log(response.data);
        const mappedEntries = mapDocDataToEntries(response.data.document);
        //console.log(mappedEntries);
        setEntries(mappedEntries);
      } catch (err) {
        //console.error(err);
        setError('Failed to load document.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  useEffect(() => {
    const firstRun = async () => {
      if (!loading && entries.length > 0 && isTotallyOrdered(entries)) {
        setTimeout(async () => {
          await playDocument(
            entries,
            setEntries,
            setUpdateUser,
            setUpdateUserMessage,
            { shouldStop: false }
          );
        }, 1500);
      }
    };
    firstRun();
  }, [loading]);

  if (loading) {
    return (
      <div className="text-center py-10 text-gray-600 text-lg">
        Loading document...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-10 text-red-600 text-lg">{error}</div>
    );
  }

  return (
    <EditEntryContext.Provider
      value={{
        editable: false,
        setUpdateUser,
        setUpdateUserMessage,
        entries,
        setEntries,
        playDocument,
      }}
    >
      <div className="w-full bg-gray-100 mt-30">
        <Canvas entries={entries} setEntries={null} />
        <UserUpdateDialog
          open={updateUser}
          message={updateUserMessage}
          onClick={closeUserUpdateDialog}
        />
      </div>
    </EditEntryContext.Provider>
  );
};

export default PublicDocumentView;
