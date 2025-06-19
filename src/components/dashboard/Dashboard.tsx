import React from "react";
import DocumentPreview from "./DocumentPreview"

interface DashboardProps {
  documents: { docTitle: string, docId: string }[];
}

const Dashboard: React.FC<DashboardProps> = ({ documents }) => {
  return (
    <div
      style={{
        backgroundColor: "#f0f0f0",
        position: "fixed",
        bottom: 0,
        width: "100%",
        height: "50vh",
        overflowY: "auto",
        padding: "1rem",
        borderTop: "1px solid #ccc",
      }}
    >
      <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
        {documents.map((doc, index) => (
          <DocumentPreview key={index} document={doc} />
        ))}
        <div
          style={{
            fontSize: "2rem",
            cursor: "pointer",
            padding: "1rem",
            border: "1px dashed gray",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100px",
            height: "100px",
          }}
        >
          +
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
