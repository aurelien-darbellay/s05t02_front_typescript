// ProfilePictureComponent.tsx
import React from 'react';
import { ProfilePicture, Shape } from '../../model/concreteEntries/ProfilePicture';

interface ProfilePictureComponentProps {
  profilePicture: ProfilePicture;
}

export const ProfilePictureComponent: React.FC<ProfilePictureComponentProps> = ({ profilePicture }) => {
  return (
    <div>
      <h2>Profile Picture</h2>
      <img src={profilePicture.urlPicture} alt="Profile" style={{ maxWidth: '200px' }} />
      <p><strong>Shape:</strong> {Shape[profilePicture.shape]}</p>

      <h3>ContainerEntry Fields</h3>
      <p><strong>Projected:</strong> {profilePicture.projected ? 'Yes' : 'No'}</p>
      <p><strong>Highlighted:</strong> {profilePicture.highlighted ? 'Yes' : 'No'}</p>
      <p>
        <strong>Position:</strong> x={profilePicture.position.xCord}, y={profilePicture.position.yCord}
      </p>
      <p><strong>Color:</strong> {profilePicture.color}</p>
      <p><strong>Size:</strong> {profilePicture.size}</p>
      <p>
        <strong>Previous Entry:</strong> projected={profilePicture.previousEntry.projected ? 'Yes' : 'No'}
        , highlighted={profilePicture.previousEntry.highlighted ? 'Yes' : 'No'}
      </p>
      <p>
        <strong>Next Entry:</strong> projected={profilePicture.nextEntry.projected ? 'Yes' : 'No'}
        , highlighted={profilePicture.nextEntry.highlighted ? 'Yes' : 'No'}
      </p>
    </div>
  );
};
