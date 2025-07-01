import { ContainerEntry, Position, Entry } from '../EntriesGeneralFeatures';

export class Identity implements ContainerEntry {
  // From Entry (via ContainerEntry)
  public type: string = 'IDENTITY';
  public displayedType: string = 'Identity';
  public codeName: string = 'identity';
  public projected: boolean;
  public highlighted: boolean;

  // From Positioned, Colored, Sized (via ContainerEntry)
  public position: Position;
  public color: string;
  public size: number;

  // From ContainerEntry
  public previousEntry: Entry | null;
  public nextEntry: Entry | null;

  // Identity-specific fields
  public names: string[];
  public lastNames: string[];

  constructor(
    position: Position,
    color: string,
    size: number,
    projected: boolean = true,
    highlighted: boolean = false,
    names?: string[],
    lastNames?: string[],
    previousEntry?: Entry,
    nextEntry?: Entry
  ) {
    this.position = position;
    this.color = color;
    this.size = size;
    this.projected = projected;
    this.highlighted = highlighted;
    this.names = names ? [...names] : [];
    this.lastNames = lastNames ? [...lastNames] : [];
    this.previousEntry = previousEntry ?? null;
    this.nextEntry = nextEntry ?? null;
    // names and lastNames default to empty arrays
  }
}
