import { ContainerEntry, Position, Entry } from '../EntriesGeneralFeatures';

export class Profession implements ContainerEntry {
  // From Entry (via ContainerEntry)
  public type: string = 'PROFESSION';
  public displayedType: string = 'Profession';
  public codeName: string = 'profession';
  public projected: boolean;
  public highlighted: boolean;

  // From Positioned, Colored, Sized (via ContainerEntry)
  public position: Position;
  public color: string;
  public size: number;

  // From ContainerEntry
  public previousEntry: Entry | null;
  public nextEntry: Entry | null;

  // Profession-specific fields
  public generalTitle: string;
  public specificTitle: string;

  constructor(
    // Profession fields
    generalTitle: string,
    specificTitle: string,

    // Positioned, Colored, Sized fields
    position: Position,
    color: string,
    size: number,

    // Entry fields (defaults to false)
    projected: boolean = true,
    highlighted: boolean = false,

    // Optional previous/next entries
    previousEntry?: Entry,
    nextEntry?: Entry
  ) {
    // Initialize Profession-specific fields
    this.generalTitle = generalTitle;
    this.specificTitle = specificTitle;

    // Initialize Positioned, Colored, Sized fields
    this.position = position;
    this.color = color;
    this.size = size;

    // Initialize Entry fields
    this.projected = projected;
    this.highlighted = highlighted;

    // Initialize ContainerEntry links
    this.previousEntry = previousEntry ?? null;
    this.nextEntry = nextEntry ?? null;
  }
}
