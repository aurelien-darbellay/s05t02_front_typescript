import { useEffect, useState } from "react";
import axios from "../axiosConfig";
import Dashboard from "./dashboard/Dashboard";

const USER_DASHBOARD_URL = "protected/users/dashboard";

const UserDashboard = () => {
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [documents, setDocuments] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await axios.get(USER_DASHBOARD_URL, { withCredentials: true });
        setDashboardData(response.data);
        setDocuments(response.data.documentsIds || []);
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
    <div style={{ paddingBottom: "20vh" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "1rem",
          marginBottom: "1.5rem",
        }}
      >
        <h2>Welcome {dashboardData?.username}</h2>
        <button
          onClick={() => {}}
          style={{
            padding: "0.5rem 1rem",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          User Details
        </button>
      </div>
      <Dashboard documents={documents} />
    </div>
  );
};

export default UserDashboard;


