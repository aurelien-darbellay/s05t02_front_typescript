import {
  ContainerEntry,
  Position,
  Entry,
  EMPTY_ENTRY,
} from '../EntriesGeneralFeatures';

export class Identity implements ContainerEntry {
  // From Entry (via ContainerEntry)
  public type: string = "identity";
  public projected: boolean;
  public highlighted: boolean;

  // From Positioned, Colored, Sized (via ContainerEntry)
  public position: Position;
  public color: string;
  public size: number;

  // From ContainerEntry
  public previousEntry: Entry;
  public nextEntry: Entry;

  // Identity-specific fields
  public names: string[] = [];
  public lastNames: string[] = [];

  constructor(
    position: Position,
    color: string,
    size: number,
    projected: boolean = false,
    highlighted: boolean = false,
    previousEntry?: Entry,
    nextEntry?: Entry
  ) {
    this.position = position;
    this.color = color;
    this.size = size;
    this.projected = projected;
    this.highlighted = highlighted;
    this.previousEntry = previousEntry ?? EMPTY_ENTRY;
    this.nextEntry = nextEntry ?? EMPTY_ENTRY;
    // names and lastNames default to empty arrays
  }
}
