import { useEffect, useState, useCallback } from 'react';
import axios from '../axiosConfig';
import Dashboard from './dashboard/Dashboard';
import { ApiPaths } from '../apiPaths';

const USER_DASHBOARD_URL = ApiPaths.USER_DASHBOARD_PATH;
const PVS_URL = ApiPaths.PVs_PATH;

const UserDashboard = () => {
  const [documentsData, setDocumentsData] = useState<any>(null);
  const username = documentsData?.username;
  const [documents, setDocuments] = useState<any[]>([]);
  const [publicViews, setPublicViews] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchDashboardData = useCallback(async () => {
    try {
      const responseDoc = await axios.get(USER_DASHBOARD_URL, {
        withCredentials: true,
      });
      setDocumentsData(responseDoc.data);
      setDocuments(responseDoc.data.documentsIds || []);
      const responsePublicView = await axios.get(PVS_URL, {
        withCredentials: true,
      });
      setPublicViews(responsePublicView.data.publicViews);
    } catch (err: any) {
      const message =
        err.response?.data?.message || err.message || 'Unknown error';
      setError('Failed to load dashboard: ' + message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  if (loading) return <p>Loading dashboard...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div style={{ paddingBottom: '20vh' }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
          marginBottom: '1.5rem',
        }}
      >
        <h2>Welcome {username}</h2>
        <button
          onClick={() => {}}
          style={{
            padding: '0.5rem 1rem',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          User Details
        </button>
      </div>
      <Dashboard
        documents={documents}
        publicViews={publicViews}
        onRefresh={fetchDashboardData}
        username={username}
      />
    </div>
  );
};

export default UserDashboard;
