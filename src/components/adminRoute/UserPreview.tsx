interface DocumentInfo {
  docId: string;
  docTitle: string;
}

interface PartialUser {
  username: string;
  firstname: string | null;
  lastname: string | null;
  role: string;
  documentsIds: DocumentInfo[];
}

interface UserPreviewProps {
  user: PartialUser;
}
import React from 'react';
import { useNavigate } from 'react-router-dom';

export const UserPreview: React.FC<UserPreviewProps> = ({ user }) => {
  const navigate = useNavigate();
  const visitUserDashBoard = () => {
    sessionStorage.setItem('actingUser', user.username);
    navigate('/user');
  };
  return (
    <div
      onClick={visitUserDashBoard}
      style={{
        border: '1px solid #ccc',
        borderRadius: '8px',
        padding: '1rem',
        minWidth: '180px',
        backgroundColor: '#fff',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        textAlign: 'center',
        cursor: 'pointer',
      }}
    >
      <h4
        style={{
          marginBottom: '0.5rem',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}
      >
        User: {user.username}
      </h4>
      <h5
        style={{
          marginBottom: '0.5rem',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}
      >
        Docs: {user.documentsIds.length}
      </h5>
      <h5
        style={{
          marginBottom: '0.5rem',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}
      >
        Role: {user.role}
      </h5>
    </div>
  );
};
