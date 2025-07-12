// ProfilePictureComponent.tsx
import React, { useContext } from 'react';
import { ProfilePicture } from '../../../model/concreteEntries/ProfilePicture';
import { getShapeStyle } from '../entryGeneralComponent/entryStyle';
import { EditEntryContext } from '../../../contexts/EditEntryContext';
import CloudinaryUploadButton from '../../cloud/CloudinaryUploadButton';

interface ProfilePictureComponentProps {
  profilePicture: ProfilePicture;
}

// Function to map Shape enum to CSS styles

export const ProfilePictureComponent: React.FC<
  ProfilePictureComponentProps
> = ({ profilePicture }) => {
  const { editable } = useContext(EditEntryContext);
  const hasPicture = Boolean(
    profilePicture.documentCloudMetadata &&
      profilePicture.documentCloudMetadata.publicUrl &&
      profilePicture.documentCloudMetadata.publicUrl.trim() !== ''
  );
  return (
    <>
      {hasPicture && (
        <div style={{ maxWidth: '300px' }}>
          <img
            src={profilePicture.documentCloudMetadata.publicUrl}
            alt="Profile"
            style={{
              maxWidth: '300px',
              maxHeight: '250px',
              height: 'auto',
              ...getShapeStyle(profilePicture.shape),
            }}
          />
        </div>
      )}
      {!hasPicture && (
        <CloudinaryUploadButton
          entry={profilePicture}
          size={0.8}
          value="Add Picture"
          isPicture={true}
        />
      )}
    </>
  );
};
