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
        textAlign: 'center',
        cursor: 'pointer',
      }}
      className="shadow hover:shadow-lg"
    >
      <h4 className="user-preview-headers">
        <span className="uppercase font-medium">User:</span> {user.username}
      </h4>
      <h5 className="user-preview-headers">
        <span className="uppercase font-medium">Docs:</span>{' '}
        {user.documentsIds.length}
      </h5>
      <h5 className="user-preview-headers">
        <span className="uppercase font-medium">Role:</span> {user.role}
      </h5>
    </div>
  );
};
