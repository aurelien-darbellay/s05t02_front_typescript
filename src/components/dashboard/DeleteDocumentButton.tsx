import { ApiPaths } from "../../apiPaths";
import axios from "../../axiosConfig";
const DeleteDocumentButton: React.FC<{ docId: string, onDelete: () => void }> = ({ docId, onDelete }) => {
  const handleDelete = async () => {
    try {
    const url = ApiPaths.DELETE_DOC_PATH.replace("{docId}", docId);
      await axios.post(url, {}, { withCredentials: true });
      onDelete();
    } catch (err) {
      console.error("Failed to delete document", err);
    }
  };

  return (
    <button
      onClick={handleDelete}
      style={{
        marginTop: "0.5rem",
        padding: "0.4rem 0.8rem",
        backgroundColor: "#dc3545",
        color: "#fff",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
        fontSize: "0.9rem",
      }}
    >
      Delete
    </button>
  );
};

export default DeleteDocumentButton;