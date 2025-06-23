import { useSearchParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useTypesConfig } from "../contexts/TypesConfigHook";
import { Canvas } from "./canvas/Canvas";
import axios from "../axiosConfig";
import { ApiPaths } from "../apiPaths";

const EditDocumentView: React.FC = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const navigate = useNavigate();
  const initialConfig = useTypesConfig();
  const [config, setConfig] = useState(initialConfig);
  const [initialDocData, setInitialDocData] = useState<any>(null);
  const [updatedDocData, setUpdatedDocData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDocument = async () => {
      try {
        const url = ApiPaths.DOC_ID_PATH.replace("{docId}", id || "");
        const response = await axios.get(url, { withCredentials: true });
        //console.log("Document data fetched:", response.data);
        setInitialDocData(response.data);
        setUpdatedDocData(response.data); // Initialize updatedDocData with fetched data
      } catch (err: any) {
        const message = err.response?.data?.message || err.message || "Unknown error";
        setError("Failed to load document: " + message);
      }
    };
    fetchDocument();
  }, [id]);

  useEffect(() => {
  //console.log('docData actually changed:', initialDocData);
}, [initialDocData]);

  const handleSave = async () => {
    if (!initialDocData || !id) return;

    try {
      const url = ApiPaths.DOC_ID_PATH.replace("{docId}", id);
      //console.log("Saving document data:", updatedDocData);
      // Ensure docData is in the correct format expected by the backend
      await axios.post(url, updatedDocData, { withCredentials: true });
      //console.log("Document saved successfully.");
    } catch (err: any) {
      //console.error("Failed to save document:", err.response?.data?.message || err.message);
    }
  };

  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!initialDocData) return <p>Loading document...</p>;

  return (
    <div className="relative w-full min-h-screen bg-gray-100">
      {/* Header stays scrollable with content */}
      <div className="relative bg-white border-b border-gray-300 flex p-6 gap-4">
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

      {/* Canvas grows with content and scrolls normally */}
      <div className="w-full">
        <Canvas docData={initialDocData} cfg={config} setDocData={setUpdatedDocData} />
      </div>
    </div>
  );
};

export default EditDocumentView;

