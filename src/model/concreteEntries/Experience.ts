import { ContainedEntry, CloudMetaData } from '../EntriesGeneralFeatures';
import { v4 as uuidv4 } from 'uuid';

export class Experience implements ContainedEntry {
  // From Entry (via ContainedEntry)
  public type: string = "EXPERIENCE";
  public displayedType: string = "Experience";
  public keyNameInDB: string = "experience";
  public projected: boolean;
  public highlighted: boolean;

  // Experience‐specific fields
  public position: string;
  public nameCompany: string;
  public startDate: Date;
  public endDate: Date;
  public description: string;
  public keywords: string[];
  public nameLink: string;
  public linkUrl: string;

  // Cloud fields
  public cloudDocumentName: string;
  public documentCloudMetadata: CloudMetaData;

  // From ContainedEntry
  public id: string;

  constructor(
    // Experience fields
    position: string,
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
    projected: boolean = false,
    highlighted: boolean = false,

    // Optional ID
    id?: string
  ) {
    // Initialize ContainedEntry/Entry properties
    this.id = id ?? uuidv4();
    this.projected = projected;
    this.highlighted = highlighted;

    // Initialize Experience properties
    this.position = position;
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
