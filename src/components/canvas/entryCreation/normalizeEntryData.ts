import { CloudinaryMetaData } from '../../../model/cloud/CloudMetaData'; // adjust path as needed

export const normalizeEntryData = (entryData: Record<string, any>) => {
  const normalized: Record<string, any> = { ...entryData };

  if (
    entryDataTypes.cloudMetaData in normalized &&
    !(normalized.documentCloudMetaData instanceof CloudinaryMetaData)
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
