import axios from '../../axiosConfig';
import { ApiPaths } from '../../apiPaths';
import { CloudinaryMetaData } from '../../model/cloud/CloudMetaData';
import { normalizeEntryData } from '../editDocumentRoute/entryCreation/normalizeEntryData';

export function createCloudinaryUploadHandler({
  setUploading,
  addOrUpdateEntry,
  exposeError,
  setErrorMessage,
  isPicture = false,
}) {
  return async function handleFileChange(event, entry) {
    const file = event.target.files[0];
    if (!file) return;

    try {
      setUploading(true);
      // 1️⃣ Validate file type
      if (
        !(file.type.startsWith('image/') || file.type === 'application/pdf') ||
        (isPicture && !file.type.startsWith('image/'))
      ) {
        exposeError(true);
        setErrorMessage(
          `Unsupported file type. Please upload an image ${isPicture ? '' : 'or a PDF'}.`
        );
        setUploading(false);
        return;
      }
      // 2️⃣ Get signature
      const signatureResp = await axios.post(ApiPaths.CLOUD_SIGNATURE_PATH, {
        fileName: file.name,
      });

      const { signature, timestamp, apiKey, cloudName, folder, publicId } =
        signatureResp.data;

      // 3️⃣ Prepare form data
      const formData = new FormData();
      formData.append('file', file);
      formData.append('api_key', apiKey);
      formData.append('timestamp', timestamp);
      formData.append('signature', signature);
      formData.append('folder', folder);
      formData.append('access', 'public');
      if (publicId) formData.append('public_id', publicId);

      // 4️⃣ Upload to Cloudinary
      const uploadUrl = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;
      const cloudinaryResp = await axios.post(uploadUrl, formData, {
        withCredentials: false,
      });
      const { public_id, url, original_filename } = cloudinaryResp.data;

      const documentCloudMetadata = new CloudinaryMetaData(public_id, url);
      const updatedEntry = {
        ...entry,
        cloudDocumentName: original_filename,
        documentCloudMetadata,
      };

      //console.log(updatedEntry);
      addOrUpdateEntry(normalizeEntryData(updatedEntry), true);
    } catch (error) {
      exposeError(true);
      setErrorMessage('Upload failed: ' + error);
    } finally {
      setUploading(false);
      event.target.value = '';
    }
  };
}
