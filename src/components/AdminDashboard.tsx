import React, { useEffect, useState } from 'react';
import axios from '../axiosConfig';
import { ApiPaths } from '../apiPaths';
import { UserPreview } from './adminRoute/UserPreview';
import { ActionButton } from '../utils/ActionButton';
import { useNavigate } from 'react-router-dom';

interface DocumentInfo {
  docId: string;
  docTitle: string;
}

interface User {
  username: string;
  firstname: string | null;
  lastname: string | null;
  role: string;
  documentsIds: DocumentInfo[];
}

const AdminDashboard: React.FC = () => {
  const [data, setData] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const handleDelete = async (username: string) => {
    const url = ApiPaths.USER_DELETE_PATH;
    try {
      await axios.post(url, { username });
      fetchAdminData();
    } catch (e) {}
  };

  const fetchAdminData = () => {
    setLoading(true);
    axios
      .get(ApiPaths.ADMIN_BASE_PATH)
      .then((response) => {
        //console.debug('Admin data received:', response.data);
        setData(response.data);
      })
      .catch((err) => {
        //console.error('Error fetching admin data:', err);
        setError('Failed to load admin data');
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchAdminData();
    sessionStorage.removeItem('actingUser');
  }, []);

  return (
    <div style={{ padding: '1rem' }}>
      <h2>Admin Dashboard</h2>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {!loading && !error && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
          {data.map((user) => (
            <div
              key={'Container:' + user.username}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '1rem',
              }}
            >
              <UserPreview key={user.username} user={user} />
              <ActionButton
                key={'Delete' + user.username}
                value="Delete"
                color="red"
                onClick={() => handleDelete(user.username)}
                margin={10}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
