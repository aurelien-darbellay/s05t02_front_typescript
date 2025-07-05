import CloudinaryUploadButton from './CloudinaryUploadButton';
import { ActionButton } from '../../utils/ActionButton';
import CloudinaryDeleteButton from './CloudinaryDeleteButton';

type CloudMetaData = {
  publicUrl: string;
  [key: string]: any;
};

type CloudAccessManagerProps = {
  cloudDocumentName: string;
  cloudMetaData: CloudMetaData | null | '';
  editable: boolean;
  onUploadSuccess?: (meta: any) => void;
  onDelete?: () => void;
};

export default function CloudAccessManager({
  cloudDocumentName,
  cloudMetaData,
  editable,
  onUploadSuccess,
  onDelete,
}: CloudAccessManagerProps) {
  // Decide if we treat the metadata as "empty"
  const isEmptyMeta = !cloudMetaData || cloudMetaData === '';

  // Helpers
  const handleDownload = async () => {
    if (cloudMetaData && cloudMetaData.publicUrl) {
      try {
        const response = await fetch(cloudMetaData.publicUrl, { mode: 'cors' });
        if (!response.ok) throw new Error('Network response was not ok');
        const blob = await response.blob();

        const blobUrl = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = blobUrl;
        link.download = cloudDocumentName || 'download';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        // Clean up
        window.URL.revokeObjectURL(blobUrl);
      } catch (error) {
        console.error('Download failed:', error);
        alert('Download failed. Check console for details.');
      }
    }
  };

  // Render
  if (isEmptyMeta) {
    if (editable) {
      return (
        <CloudinaryUploadButton
          onUploadSuccess={() => {}}
          onUploadError={() => {}}
        />
      );
    } else {
      return null;
    }
  }

  // If metadata exists
  return (
    <div style={{ display: 'flex', gap: '10px' }}>
      <ActionButton onClick={handleDownload} value="Download" color="green" />
      {editable && <CloudinaryDeleteButton publicId={cloudMetaData.id} />}
    </div>
  );
}
