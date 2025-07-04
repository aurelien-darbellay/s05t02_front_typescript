import DocumentPreview from './DocumentPreview';
import DeleteDocumentButton from './DeleteDocumentButton';
import { useState } from 'react';
import CreateDocumentDialog from './CreateDocumentDialog';

interface DashboardProps {
  documents: { docTitle: string; docId: string; docType: string }[];
  onRefresh: () => void;
  username: string;
}

const Dashboard: React.FC<DashboardProps> = ({
  documents,
  onRefresh,
  username,
}) => {
  const [open, setOpen] = useState(false);

  return (
    <div
      style={{
        backgroundColor: '#f0f0f0',
        position: 'fixed',
        bottom: 0,
        width: '100%',
        height: '50vh',
        overflowY: 'auto',
        padding: '1rem',
        borderTop: '1px solid #ccc',
      }}
    >
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        {documents.map((doc, index) => (
          <div
            key={index}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <DocumentPreview document={doc} username={username} />
            <DeleteDocumentButton docId={doc.docId} onDelete={onRefresh} />
          </div>
        ))}
        <div
          style={{
            fontSize: '2rem',
            cursor: 'pointer',
            padding: '1rem',
            border: '1px dashed gray',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100px',
            height: '100px',
          }}
          onClick={() => setOpen(true)}
        >
          +
        </div>
      </div>
      <CreateDocumentDialog
        open={open}
        onClose={() => {
          setOpen(false);
          onRefresh();
        }}
      />
    </div>
  );
};

export default Dashboard;
