import { ContainerEntry, Position, Entry } from '../EntriesGeneralFeatures';

export enum Shape {
  SQUARE = 'SQUARE',
  TRIANGLE = 'TRIANGLE',
  RECTANGLE = 'RECTANGLE',
  STAR = 'STAR',
  ROUND = 'ROUND',
}

export class ProfilePicture implements ContainerEntry {
  // From Entry (via ContainerEntry)
  public type: string = 'PROFILE_PICTURE';
  public displayedType: string = 'Profile Picture';
  public codeName: string = 'profilePicture';
  public projected: boolean;
  public highlighted: boolean;

  // From Positioned, Colored, Sized (via ContainerEntry)
  public position: Position;
  public color: string;
  public size: number;

  // From ContainerEntry
  public previousEntry: Entry | null;
  public nextEntry: Entry | null;

  // ProfilePicture-specific fields
  public urlPicture: string;
  public shape: Shape;

  constructor(
    // ProfilePicture fields
    urlPicture: string,
    shape: Shape = Shape.ROUND,

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
    // Initialize ProfilePicture-specific fields
    this.urlPicture = urlPicture;
    this.shape = shape;

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
