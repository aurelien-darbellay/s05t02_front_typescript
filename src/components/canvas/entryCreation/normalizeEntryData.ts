import { CloudinaryMetaData } from '../../../model/cloud/CloudMetaData'; // adjust path as needed

export const normalizeEntryData = (entryData: Record<string, any>) => {
  console.log(entryData);
  const normalized: Record<string, any> = { ...entryData };
  if (
    entryDataTypes.cloudMetaData in normalized &&
    !CloudinaryMetaData.isCloudinaryMetaData(
      normalized[entryDataTypes.cloudMetaData]
    )
  ) {
    const value = normalized.documentCloudMetadata;
    normalized[entryDataTypes.cloudMetaData] = new CloudinaryMetaData(
      value,
      value
    );
  }
  if (
    entryDataTypes.names in normalized &&
    !isArrayOfStrings(normalized[entryDataTypes.names])
  ) {
    normalized[entryDataTypes.names] = normalized[entryDataTypes.names]
      .split(' ')
      .map((str) => str.trim());
  }
  if (
    entryDataTypes.lastNames in normalized &&
    !isArrayOfStrings(normalized[entryDataTypes.lastNames])
  ) {
    normalized[entryDataTypes.lastNames] = normalized[entryDataTypes.lastNames]
      .split(' ')
      .map((str) => str.trim());
  }
  return normalized;
};

const entryDataTypes = {
  cloudMetaData: 'documentCloudMetadata',
  names: 'names',
  lastNames: 'lastNames',
};

function isArrayOfStrings(value: unknown): value is string[] {
  return (
    Array.isArray(value) && value.every((item) => typeof item === 'string')
  );
}
