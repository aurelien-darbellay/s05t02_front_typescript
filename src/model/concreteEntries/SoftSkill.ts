import { ContainedEntry } from '../EntriesGeneralFeatures';
import { v4 as uuidv4 } from 'uuid';

export class SoftSkill implements ContainedEntry {
  // From Entry (via ContainedEntry)
  public type: string = "SOFT_SKILL";
  public displayedType: string = "Soft Skill";
  public keyNameInDB: string = "softSkill";
  public projected: boolean;
  public highlighted: boolean;

  // From ContainedEntry
  public id: string;

  // SoftSkill-specific field
  public keyWords: string;

  constructor(
    keyWords: string,

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

    // Initialize SoftSkill property
    this.keyWords = keyWords;
  }
}
