import { useEffect, useState } from "react";
import axios from "../axiosConfig";

const USER_DASHBOARD_URL = "protected/users/dashboard";

const UserDashboard = () => {
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await axios.get(USER_DASHBOARD_URL, { withCredentials: true });
        setDashboardData(response.data);
      } catch (err: any) {
        const message = err.response?.data?.message || err.message || "Unknown error";
        setError("Failed to load dashboard: " + message);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) return <p>Loading dashboard...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div>
      <h2>User Dashboard</h2>
      <pre>{JSON.stringify(dashboardData, null, 2)}</pre>
    </div>
  );
};

export default UserDashboard;

