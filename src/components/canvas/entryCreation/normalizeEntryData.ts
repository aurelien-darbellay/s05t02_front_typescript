import { CloudinaryMetaData } from '../../../model/cloud/CloudMetaData'; // adjust path as needed

export const normalizeEntryData = (entryData: Record<string, any>) => {
  console.log(entryData);
  const normalized: Record<string, any> = { ...entryData };
  console.log(normalized.documentCloudMetadata);
  console.log(
    CloudinaryMetaData.isCloudinaryMetaData(normalized.documentCloudMetadata)
  );
  if (
    entryDataTypes.cloudMetaData in normalized &&
    !CloudinaryMetaData.isCloudinaryMetaData(normalized.documentCloudMetadata)
  ) {
    const value = normalized.documentCloudMetadata;
    normalized.documentCloudMetadata = new CloudinaryMetaData(value, value);
  }

  // Add more normalizations here as needed
  //console.log('Normalized entry data:', normalized);
  return normalized;
};

const entryDataTypes = {
  cloudMetaData: 'documentCloudMetadata',
};
