import React from 'react';
import { CloudinaryMetaData } from '../../../model/cloud/CloudMetaData'; // Adjust path if needed

interface CloudinaryMetaInputProps {
  value: any;
}

export const CloudinaryMetaInput: React.FC<CloudinaryMetaInputProps> = ({
  value,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value: val } = e.target;

    const current =
      value instanceof CloudinaryMetaData
        ? value
        : new CloudinaryMetaData('', '');

    const updated = new CloudinaryMetaData(
      name === 'id' ? val : current.id,
      name === 'publicUrl' ? val : current.publicUrl
    );
  };

  return (
    <div className="space-y-2">
      <input
        name="id"
        type="text"
        placeholder="Cloudinary ID"
        value={value?.id || ''}
        onChange={handleChange}
        className="w-full border border-gray-300 rounded-md p-2"
      />
      <input
        name="publicUrl"
        type="url"
        placeholder="Public URL"
        value={value?.publicUrl || ''}
        onChange={handleChange}
        className="w-full border border-gray-300 rounded-md p-2"
      />
    </div>
  );
};
