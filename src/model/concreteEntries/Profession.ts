import { ContainerEntry, Position } from '../EntriesGeneralFeatures';
import { v4 as uuidv4 } from 'uuid';
export class Profession implements ContainerEntry {
  // From Entry (via ContainerEntry)
  public type: string = 'PROFESSION';
  public displayedType: string = 'Profession';
  public codeName: string = 'profession';
  public projected: boolean;
  public highlighted: boolean;
  public header: string;

  // From Positioned, Colored, Sized (via ContainerEntry)
  public position: Position;
  public color: string;
  public size: number;

  // From ContainerEntry
  public previousEntry: string | null;
  public nextEntry: string | null;
  public id: string | null;

  // Profession-specific fields
  public generalTitle: string;
  public specificTitle: string;

  constructor(
    header: string,
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
    id?: string,

    // Optional previous/next entries
    previousEntry?: string,
    nextEntry?: string
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
    this.id = id ?? uuidv4();
    this.header = header;
    // Initialize ContainerEntry links
    this.previousEntry = previousEntry ?? null;
    this.nextEntry = nextEntry ?? null;
  }
}
