import { ContainerEntry, Position } from '../EntriesGeneralFeatures';
import { v4 as uuidv4 } from 'uuid';
export class Identity implements ContainerEntry {
  // From Entry (via ContainerEntry)
  public type: string = 'IDENTITY';
  public displayedType: string = 'Identity';
  public codeName: string = 'identity';
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

  // Identity-specific fields
  public names: string[];
  public lastNames: string[];
  public id: string | null;

  constructor(
    header: string,
    position: Position,
    color: string,
    size: number,
    projected: boolean = true,
    highlighted: boolean = false,
    names?: string[],
    lastNames?: string[],
    id?: string,
    previousEntry?: string,
    nextEntry?: string
  ) {
    this.id = id ?? uuidv4();
    this.position = position;
    this.color = color;
    this.size = size;
    this.projected = projected;
    this.highlighted = highlighted;
    this.names = names ? [...names] : [];
    this.lastNames = lastNames ? [...lastNames] : [];
    this.previousEntry = previousEntry ?? null;
    this.nextEntry = nextEntry ?? null;
    this.header = header;
    // names and lastNames default to empty arrays
  }
}
