import { useContext, useState } from 'react';
import CloudinaryUploadButton from './CloudinaryUploadButton';
import { ActionButton } from '../../utils/ActionButton';
import CloudinaryDeleteButton from './CloudinaryDeleteButton';
import { EditEntryContext } from '../../contexts/EditEntryContext';
import { PointsToFileInCloud } from '../../model/EntriesGeneralFeatures';

type CloudAccessManagerProps = {
  entry: PointsToFileInCloud;
  size?: number;
};

export default function CloudAccessManager({
  entry,
  size = 1,
}: CloudAccessManagerProps) {
  const [open, setOpen] = useState(false);
  const icon = `<svg class="target" width="20" height="20" viewBox="0 0 24 24" fill="grey" xmlns="http://www.w3.org/2000/svg">
    <path class="target" d="M6 2C4.9 2 4 2.9 4 4V20C4 21.11 4.9 22 6 22H18C19.1 22 20 21.11 20 20V8L14 2H6M13 9V3.5L18.5 9H13Z" />
  </svg>`;
  console.log(entry);
  const { documentCloudMetadata, cloudDocumentName } = entry ?? {};
  const { editable } = useContext(EditEntryContext);
  // Decide if we treat the metadata as "empty"
  const isPicture = entry.type === 'PROFILE_PICTURE';
  const isEmptyMeta =
    !documentCloudMetadata || !documentCloudMetadata.publicUrl;
  //console.log('Empty: ', isEmptyMeta);
  const targetUrl = documentCloudMetadata?.publicUrl;

  const textUpload = isPicture ? 'Add Picture' : 'Add File';
  // Toggle dropdown
  const toggleOpen = () => {
    setOpen((prev) => !prev);
  };

  // Helpers
  const handleDownload = async () => {
    if (documentCloudMetadata && documentCloudMetadata.publicUrl) {
      try {
        const response = await fetch(documentCloudMetadata.publicUrl, {
          mode: 'cors',
        });
        if (!response.ok) throw new Error('Network response was not ok');
        const blob = await response.blob();

        const blobUrl = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = blobUrl;
        link.download = cloudDocumentName || 'download';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(blobUrl);
      } catch (error) {
        //console.error('Download failed:', error);
        alert('Download failed. Check console for details.');
      }
    }
  };

  function openInNewWindow(url) {
    if (!url) {
      //console.error('No URL provided');
      return;
    }
    window.open(url, '_blank', 'noopener,noreferrer');
  }

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      {(editable || !isEmptyMeta) && (
        <div style={{ position: 'relative', display: 'inline-block' }}>
          <ActionButton
            onClick={toggleOpen}
            value={open ? 'Close File Actions' : 'Manage File'}
            color="transparent"
            margin={2}
            icon={icon}
            text="black"
            size={size}
          />

          {open && (
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                gap: '0px',
                position: 'absolute',
                top: 0,
                left: `${size * 42}px`,
                zIndex: 1000,
              }}
            >
              {isEmptyMeta ? (
                editable ? (
                  // Case 3: Editable & Empty -> Upload
                  <CloudinaryUploadButton
                    size={size}
                    entry={entry}
                    value={textUpload}
                    isPicture
                  />
                ) : null
              ) : (
                <>
                  {
                    <ActionButton
                      onClick={handleDownload}
                      value="Download"
                      color="green"
                      size={0.8 * size}
                    />
                  }
                  <ActionButton
                    onClick={() => openInNewWindow(targetUrl)}
                    value="View"
                    color="green"
                    size={0.8 * size}
                  />
                  {editable && (
                    // Case 4: Editable & Not Empty -> Delete
                    <CloudinaryDeleteButton
                      entry={entry}
                      size={size}
                      onClose={toggleOpen}
                    />
                  )}
                </>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
