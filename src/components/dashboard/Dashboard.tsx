import DocumentPreview from './DocumentPreview';
import { useState } from 'react';
import CreateDocumentDialog from './CreateDocumentDialog';
import PublicViewPreview from './PublicViewPreview';
import { createDeleteDocument, createDeletePublicView } from './deleters';
import { ActionButton } from '../../utils/ActionButton';

interface DashboardProps {
  documents: { docTitle: string; docId: string; docType: string }[];
  publicViews: { pvId: string; docTitle: string }[];
  onRefresh: () => void;
  username: string;
  isAdminInSomeoneElseSpace: boolean;
}

const Dashboard: React.FC<DashboardProps> = ({
  documents,
  publicViews,
  onRefresh,
  username,
  isAdminInSomeoneElseSpace,
}) => {
  const [open, setOpen] = useState(false);
  const deleteDocument = createDeleteDocument(onRefresh);
  const deletePublicView = createDeletePublicView(onRefresh);

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
      <h2>Documents</h2>
      <div
        style={{
          display: 'flex',
          gap: '1rem',
          flexWrap: 'wrap',
          marginBottom: '20px',
        }}
      >
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
            <ActionButton
              value="Delete"
              color="red"
              onClick={() => deleteDocument(doc.docId)}
              margin={10}
              disabled={isAdminInSomeoneElseSpace}
            />
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
      <h2>Public Views</h2>
      <div
        style={{
          display: 'flex',
          gap: '1rem',
          flexWrap: 'wrap',
          marginBottom: '20px',
        }}
      >
        {publicViews.map((publicView, index) => (
          <div
            key={index}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <PublicViewPreview
              id={publicView.pvId}
              title={publicView.docTitle}
              key={index}
            />
            <ActionButton
              value="Delete"
              color="red"
              onClick={() => deletePublicView(publicView.pvId)}
              margin={10}
              disabled={isAdminInSomeoneElseSpace}
            />
          </div>
        ))}
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
