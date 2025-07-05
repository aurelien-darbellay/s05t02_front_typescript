import { useRef, useState } from 'react';
import axios from '../../axiosConfig';
import { ActionButton } from '../../utils/ActionButton';
import { ApiPaths } from '../../apiPaths';

export default function CloudinaryUploadButton({
  onUploadSuccess,
  onUploadError,
}) {
  const fileInputRef = useRef(null);
  const [uploading, setUploading] = useState(false);

  const handleButtonClick = () => {
    if (uploading) return;
    fileInputRef.current.click();
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    try {
      setUploading(true);

      // 1️⃣ Extract file name to pass to server
      const fileName = file.name;

      console.log('Selected file name:', fileName);

      // 2️⃣ Get signature from your backend with fileName in body
      const signatureResp = await axios.post(ApiPaths.CLOUD_SIGNATURE_PATH, {
        fileName,
      });

      const { signature, timestamp, apiKey, cloudName, folder, publicId } =
        signatureResp.data;

      // 3️⃣ Prepare form data for Cloudinary
      const formData = new FormData();
      formData.append('file', file);
      formData.append('api_key', apiKey);
      formData.append('timestamp', timestamp);
      formData.append('signature', signature);
      formData.append('folder', folder);

      if (publicId) {
        formData.append('public_id', publicId);
      }

      // Debug
      console.log('Uploading to Cloudinary with FormData:');
      for (const [key, val] of formData.entries()) {
        console.log(key, val);
      }

      // 4️⃣ Upload to Cloudinary
      const uploadUrl = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;
      const cloudinaryResp = await axios.post(uploadUrl, formData, {
        withCredentials: false,
      });

      if (onUploadSuccess) {
        onUploadSuccess(cloudinaryResp.data);
      }

      alert('Upload successful!');
    } catch (error) {
      console.error('Upload failed:', error);
      if (onUploadError) {
        onUploadError(error);
      }
      alert('Upload failed. Check console for details.');
    } finally {
      setUploading(false);
      event.target.value = '';
    }
  };

  return (
    <div>
      <ActionButton
        onClick={handleButtonClick}
        disabled={uploading}
        color="purple"
        value={uploading ? 'Uploading...' : 'Upload to Cloudinary'}
      />

      <input
        type="file"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleFileChange}
        accept="*/*"
      />
    </div>
  );
}
