import { ContainerEntry, Position } from '../EntriesGeneralFeatures';
import { v4 as uuidv4 } from 'uuid';
export class Summary implements ContainerEntry {
  // From Entry (via ContainerEntry)
  public type: string = 'SUMMARY';
  public displayedType: string = 'Summary';
  public codeName: string = 'summary';
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

  // Summary-specific fields
  public title: string;
  public text: string;

  constructor(
    header: string,
    // Summary fields
    title: string,
    text: string,

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
    // Initialize Summary-specific fields
    this.title = title;
    this.text = text;

    // Initialize Positioned, Colored, Sized fields
    this.position = position;
    this.color = color;
    this.size = size;

    // Initialize Entry fields
    this.projected = projected;
    this.highlighted = highlighted;
    this.id = id ?? uuidv4();

    // Initialize ContainerEntry links
    this.previousEntry = previousEntry ?? null;
    this.nextEntry = nextEntry ?? null;
    this.header = header;
  }
}
