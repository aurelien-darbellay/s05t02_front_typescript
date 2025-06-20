
import { useSearchParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useTypesConfig } from "../contexts/TypesConfigHook";
import { Canvas } from "./canvas/Canvas";
import axios from "../axiosConfig";

const EditDocumentView: React.FC = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const navigate = useNavigate();
  const initialConfig = useTypesConfig();
  const [config, setConfig] = useState(initialConfig);
  const [docData, setDocData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDocument = async () => {
      try {
        const response = await axios.get(`/protected/users/doc/${id}`, { withCredentials: true });
        setDocData(response.data);
      } catch (err: any) {
        const message = err.response?.data?.message || err.message || "Unknown error";
        setError("Failed to load document: " + message);
      }
    };

    fetchDocument();
  }, [id]);

  const handleSave = async () => {
    if (!docData || !id) return;

    try {
      await axios.post(`/protected/users/doc/${id}`, docData, { withCredentials: true });
      console.log("Document saved successfully.");
    } catch (err: any) {
      console.error("Failed to save document:", err.response?.data?.message || err.message);
    }
  };

  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!docData) return <p>Loading document...</p>;

  return (
    <>
      <div
        style={{
          backgroundColor: "#fff",
          marginTop: "5rem",
          padding: "1.5rem 1rem 1rem",
          borderBottom: "1px solid #ddd",
          marginBottom: "1rem",
          display: "flex",
          gap: "1rem",
        }}
      >
        <button
          onClick={() => navigate("/user")}
          style={{
            padding: "0.5rem 1.2rem",
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            fontSize: "1rem",
          }}
        >
          Back to Dashboard
        </button>

        <button
          onClick={handleSave}
          style={{
            padding: "0.5rem 1.2rem",
            backgroundColor: "#28a745",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            fontSize: "1rem",
          }}
        >
          Save
        </button>
      </div>

      <Canvas docData={docData} />
    </>
  );
};

export default EditDocumentView;
