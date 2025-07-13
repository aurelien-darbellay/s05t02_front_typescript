import {
  ContainerEntry,
  Position,
  CloudMetaData,
} from '../EntriesGeneralFeatures';
import { v4 as uuidv4 } from 'uuid';
export enum Shape {
  SQUARE = 'SQUARE',
  RECTANGLE = 'RECTANGLE',
  STAR = 'STAR',
  ROUND = 'ROUND',
  MATCH = 'MATCH',
}

export class ProfilePicture implements ContainerEntry {
  // From Entry (via ContainerEntry)
  public type: string = 'PROFILE_PICTURE';
  public displayedType: string = 'Profile Picture';
  public codeName: string = 'profilePicture';
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

  // ProfilePicture-specific fields
  public documentCloudMetadata: CloudMetaData;
  public shape: Shape;

  constructor(
    header: string,
    // ProfilePicture fields
    documentCloudMetadata: CloudMetaData,
    shape: Shape = Shape.ROUND,

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
    // Initialize ProfilePicture-specific fields
    this.documentCloudMetadata = documentCloudMetadata;
    this.shape = shape;

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
