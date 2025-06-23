import { useSearchParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useTypesConfig } from "../contexts/TypesConfigHook";
import { Canvas } from "./canvas/Canvas";
import axios from "../axiosConfig";
import { ApiPaths } from "../apiPaths";
import { ActionButton } from "./ActionButton";

const EditDocumentView: React.FC = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const navigate = useNavigate();
  const initialConfig = useTypesConfig();
  const [config, setConfig] = useState(initialConfig);
  const [initialDocData, setInitialDocData] = useState<any>(null);
  const [updatedDocData, setUpdatedDocData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [saveUpdate, setSaveUpdate] = useState(false);
  const [saveUpdateMessage, setSaveUpdateMessage] = useState("");




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


  const handleSave = async () => {
    if (!initialDocData || !id) return;
    try {
      const url = ApiPaths.DOC_ID_PATH.replace("{docId}", id);
      await axios.post(url, updatedDocData, { withCredentials: true });
      setSaveUpdateMessage("Document saved successfully!");
    } catch (err: any) {
      const message = err.response?.data?.message || err.message || "Unknown error";
      setSaveUpdateMessage("Failed to save document: " + message);
    }
    setSaveUpdate(true);
  };

  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!initialDocData) return <p>Loading document...</p>;

  return (
    <div className="relative w-full min-h-screen bg-gray-100">
      {/* Header stays scrollable with content */}
      <div className="relative bg-white border-b border-gray-300 flex p-6 gap-4">
        <ActionButton onClick={() => navigate("/user")}  value="Back to Dashboard" color="#007bff" />
        <ActionButton onClick={handleSave} message={saveUpdateMessage} open={saveUpdate} value="Save" color="#28a745" onOkay={()=>setSaveUpdate(false)}/>
        <ActionButton onClick ={()=>setDialogOpen(true)} value="Add Entry" color="#28a745" />
      </div>

      {/* Canvas grows with content and scrolls normally */}
      <div className="w-full">
        <Canvas docData={initialDocData} cfg={config} setDocData={setUpdatedDocData} dialogOpen={dialogOpen} setDialogOpen={setDialogOpen} />
      </div>
    </div>
  );
};

export default EditDocumentView;

