import React from "react";

interface Document {
  docTitle: string;
  docId: string;
}

interface DocumentPreviewProps {
  document: Document;
}

const DocumentPreview: React.FC<DocumentPreviewProps> = ({ document }) => {
  return (
    <div
      style={{
        border: "1px solid #ccc",
        borderRadius: "8px",
        padding: "1rem",
        width: "150px",
        cursor: "pointer",
        backgroundColor: "#fff",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        textAlign: "center",
      }}
    >
      <h4>{document.docTitle}</h4>
    </div>
  );
};

export default DocumentPreview;

