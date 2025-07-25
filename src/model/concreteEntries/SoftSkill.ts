import { ItemKeyWords } from '../EntriesGeneralFeatures';
import { v4 as uuidv4 } from 'uuid';

export class SoftSkill implements ItemKeyWords {
  // From Entry (via ContainedEntry)
  public type: string = 'SOFT_SKILL';
  public displayedType: string = 'Soft Skill';
  public codeName: string = 'softSkill';
  public projected: boolean;
  public highlighted: boolean;

  // From ContainedEntry
  public id: string;

  // SoftSkill-specific field
  public keyWords: string;

  constructor(
    keyWords: string,

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

    // Initialize SoftSkill property
    this.keyWords = keyWords;
  }
}
