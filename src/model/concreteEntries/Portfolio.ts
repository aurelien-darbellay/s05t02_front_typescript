import { ContainedEntry } from '../EntriesGeneralFeatures';
import { v4 as uuidv4 } from 'uuid';

export class Portfolio implements ContainedEntry {
  // From Entry (via ContainedEntry)
  public type: string = 'PORTFOLIO';
  public displayedType: string = 'Portfolio';
  public keyNameInDB: string = 'portfolio';
  public projected: boolean;
  public highlighted: boolean;

  // From ContainedEntry
  public id: string;

  // Portfolio-specific fields
  public projectName: string;
  public projectUrl: string;

  constructor(
    // Portfolio fields
    projectName: string,
    projectUrl: string,

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

    // Initialize Portfolio properties
    this.projectName = projectName;
    this.projectUrl = projectUrl;
  }
}
