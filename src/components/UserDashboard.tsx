import { useEffect, useState, useCallback } from 'react';
import axios from '../axiosConfig';
import Dashboard from './dashboard/Dashboard';
import { ApiPaths } from '../apiPaths';
import { ActionButton } from '../utils/ActionButton';
import { useNavigate } from 'react-router-dom';

const USER_DASHBOARD_URL = ApiPaths.USER_DASHBOARD_PATH;
const PVS_URL = ApiPaths.PVs_PATH;

const UserDashboard = () => {
  const [documentsData, setDocumentsData] = useState<any>(null);
  const username = documentsData?.username;
  const [actingUser] = useState<string | null>(() => {
    return sessionStorage.getItem('actingUser');
  });
  const [documents, setDocuments] = useState<any[]>([]);
  const [publicViews, setPublicViews] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  const loggedInUser = localStorage.getItem('username');
  const isAdminInSomeoneElseSpace = Boolean(
    actingUser && !(actingUser === loggedInUser)
  );

  const fetchDashboardData = useCallback(async () => {
    try {
      const responseDoc = actingUser
        ? await axios.get(USER_DASHBOARD_URL + '?targetUser=' + actingUser)
        : await axios.get(USER_DASHBOARD_URL);
      setDocumentsData(responseDoc.data);
      setDocuments(responseDoc.data.documentsIds || []);
      const responsePublicView = actingUser
        ? await axios.get(PVS_URL + '?targetUser=' + actingUser)
        : await axios.get(PVS_URL);
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
          gap: '3rem',
          marginBottom: '1.5rem',
        }}
      >
        {isAdminInSomeoneElseSpace ? (
          <h2 className="dashboard-header">This is {username}'s dashboard</h2>
        ) : (
          <h2 className="dashboard-header">Welcome {username}</h2>
        )}
        <ActionButton
          value="User Details"
          color="rgb(241, 6, 175)"
          onClick={() => {}}
        />
        {actingUser ? (
          <ActionButton
            value="Admin Dashboard"
            color="purple"
            onClick={() => navigate('/admin')}
          />
        ) : (
          ''
        )}
      </div>
      <Dashboard
        documents={documents}
        publicViews={publicViews}
        onRefresh={fetchDashboardData}
        username={username}
        isAdminInSomeoneElseSpace={isAdminInSomeoneElseSpace}
      />
    </div>
  );
};

export default UserDashboard;
