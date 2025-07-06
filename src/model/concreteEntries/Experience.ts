import {
  ContainedEntry,
  CloudMetaData,
  PointsToFileInCloud,
} from '../EntriesGeneralFeatures';
import { v4 as uuidv4 } from 'uuid';

export class Experience implements ContainedEntry, PointsToFileInCloud {
  // From Entry (via ContainedEntry)
  public type: string = 'EXPERIENCE';
  public displayedType: string = 'Experience';
  public codeName: string = 'experience';
  public projected: boolean;
  public highlighted: boolean;

  // Experience‐specific fields
  public role: string;
  public nameCompany: string;
  public startDate: Date;
  public endDate: Date;
  public description: string;
  public keywords: string;
  public nameLink: string;
  public linkUrl: string;

  // Cloud fields
  public cloudDocumentName: string;
  public documentCloudMetadata: CloudMetaData;

  // From ContainedEntry
  public id: string;

  constructor(
    // Experience fields
    role: string,
    nameCompany: string,
    startDate: Date,
    endDate: Date,
    description: string,
    keywords: string[],
    nameLink: string,
    linkUrl: string,

    // Cloud fields
    cloudDocumentName: string,
    documentCloudMetadata: CloudMetaData,

    // Entry fields (defaults to false)
    projected: boolean = true,
    highlighted: boolean = false,

    // Optional ID
    id?: string
  ) {
    // Initialize ContainedEntry/Entry properties
    this.id = id ?? uuidv4();
    this.projected = projected;
    this.highlighted = highlighted;

    // Initialize Experience properties
    this.role = role;
    this.nameCompany = nameCompany;
    this.startDate = startDate;
    this.endDate = endDate;
    this.description = description;
    this.keywords = keywords;
    this.nameLink = nameLink;
    this.linkUrl = linkUrl;

    // Initialize Cloud fields
    this.cloudDocumentName = cloudDocumentName;
    this.documentCloudMetadata = documentCloudMetadata;
  }
}
