import { ContainedEntry, CloudMetaData } from '../EntriesGeneralFeatures';
import { v4 as uuidv4 } from 'uuid';

export enum Level {
  CONVERSATIONAL = 'CONVERSATIONAL',
  FLUENT = 'FLUENT',
  PROFICIENT = 'PROFICIENT',
  NATIVE = 'NATIVE',
  PROFESSIONAL = 'PROFESSIONAL',
}

export class Language implements ContainedEntry {
  // From Entry (via ContainedEntry)
  public type: string = "language";
  public projected: boolean;
  public highlighted: boolean;

  // From ContainedEntry
  public id: string;

  // Language-specific fields
  public name: string;
  public level: Level;

  // From PointsToFileInCloud
  public cloudDocumentName: string;
  public documentCloudMetadata: CloudMetaData;

  constructor(
    name: string,
    level: Level,
    // Cloud fields
    cloudDocumentName: string,
    documentCloudMetadata: CloudMetaData,
    // Entry fields (defaults to false)
    projected: boolean = false,
    highlighted: boolean = false,
    // Optional ID
    id?: string
  ) {
    // Initialize ContainedEntry/Entry properties
    this.id = id ?? uuidv4();
    this.projected = projected;
    this.highlighted = highlighted;

    // Initialize Language properties
    this.name = name;
    this.level = level;

    // Initialize PointsToFileInCloud properties
    this.cloudDocumentName = cloudDocumentName;
    this.documentCloudMetadata = documentCloudMetadata;
  }
}
