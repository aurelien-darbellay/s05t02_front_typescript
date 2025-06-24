// ProfilePictureComponent.tsx
import React from 'react';
import {
  ProfilePicture,
  Shape,
} from '../../../model/concreteEntries/ProfilePicture';

interface ProfilePictureComponentProps {
  profilePicture: ProfilePicture;
}

export const ProfilePictureComponent: React.FC<
  ProfilePictureComponentProps
> = ({ profilePicture }) => {
  return (
    <div>
      <img
        src={profilePicture.urlPicture}
        alt="Profile"
        style={{ maxWidth: '200px' }}
      />
      <p>
        <strong>Shape:</strong> {Shape[profilePicture.shape]}
      </p>
    </div>
  );
};
