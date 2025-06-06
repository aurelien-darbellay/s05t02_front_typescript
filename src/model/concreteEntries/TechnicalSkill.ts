import { ContainedEntry } from '../EntriesGeneralFeatures';
import { v4 as uuidv4 } from 'uuid';

export class TechnicalSkill implements ContainedEntry {
  // From Entry (via ContainedEntry)
  public projected: boolean;
  public highlighted: boolean;

  // From ContainedEntry
  public id: string;

  // TechnicalSkill-specific field
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

    // Initialize TechnicalSkill property
    this.keyWords = keyWords;
  }
}
