import React from 'react';
import { ApiPaths } from '../../apiPaths';

interface PublicViewPreviewProps {
  id: string;
  title: string;
}

const PublicViewPreview: React.FC<PublicViewPreviewProps> = ({ id, title }) => {
  const displayedId = id.slice(id.lastIndexOf('-') + 1);

  const handleClick = () => {
    const url = `${ApiPaths.FRONT_ORIGIN}/public/${id}`;
    window.open(url, '_blank');
  };

  return (
    <div
      onClick={handleClick}
      style={{
        border: '1px solid #ccc',
        borderRadius: '8px',
        padding: '1rem',
        cursor: 'pointer',
        backgroundColor: '#fff',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        textAlign: 'center',
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
        Document : {title}
      </h4>
      <h5
        style={{
          marginBottom: '0.5rem',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}
      >
        Public View : {displayedId}
      </h5>
    </div>
  );
};

export default PublicViewPreview;
