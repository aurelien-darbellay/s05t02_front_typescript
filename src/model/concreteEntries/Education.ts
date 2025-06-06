import { ContainedEntry, CloudMetaData } from '../EntriesGeneralFeatures'; // adjust import paths as needed// adjust import paths
import { v4 as uuidv4 } from 'uuid';

export class Education implements ContainedEntry {
  // From Entry (via ContainedEntry)
  public projected: boolean;
  public highlighted: boolean;

 

  // Education-specific fields
  public title: string;
  public trainingCenter: string;
  public graduationYear: number;
  public comments: string;

  // From PointsToFileInCloud
  public cloudDocumentName: string;
  public documentCloudMetadata: CloudMetaData;

   // From ContainedEntry
  public id: string;

  constructor(
    // Optional ID: if none is provided, generate a UUID
    title: string,
    trainingCenter: string,
    graduationYear: number,
    comments: string,
    // Cloud fields
    cloudDocumentName: string,
    documentCloudMetadata: CloudMetaData,
    // Entry fields (defaults to false)
    projected: boolean = false,
    highlighted: boolean = false,
    //Optional fields
    id?: string,
  ) {
    // Initialize ContainedEntry/Entry properties
    this.id = id ?? uuidv4();
    this.projected = projected;
    this.highlighted = highlighted;

    // Initialize Education properties
    this.title = title;
    this.trainingCenter = trainingCenter;
    this.graduationYear = graduationYear;
    this.comments = comments;

    // Initialize PointsToFileInCloud properties
    this.cloudDocumentName = cloudDocumentName;
    this.documentCloudMetadata = documentCloudMetadata;
  }
}
