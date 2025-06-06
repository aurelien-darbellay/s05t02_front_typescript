export interface Entry {
  projected: boolean;
  highlighted: boolean;
}
export interface Position {
  xCord: number;
  yCord: number;
}

export interface CloudMetaData {
  publicUrl: string;
  id: string;
}
interface Positioned {
  position:Position;
}
interface Colored {
  color: string;
}
interface Sized {
  size: number;
}
export interface ContainerEntry extends Entry, Positioned, Colored, Sized {
  previousEntry: Entry;
  nextEntry: Entry;
}
export interface ContainedEntry extends Entry {
  id: string;
}

export const EMPTY_ENTRY: Entry = {
  projected: false,
  highlighted: false,
};

export class ListEntries implements ContainerEntry {
  public typeOfEntry: string;
  public entries: Entry[];
  public projected: boolean;
  public highlighted: boolean;
  public position: Position;
  public color: string;
  public size: number;
  public previousEntry: Entry;
  public nextEntry: Entry;

  constructor(
    typeOfEntry: string,
    entries: Entry[],
    projected:boolean,
    highlighted:boolean,
    position: Position,
    color: string,
    size: number,
    previous?: Entry,
    next?: Entry
  ) {
    this.typeOfEntry = typeOfEntry;
    this.entries = entries;
    this.projected = projected;
    this.highlighted = highlighted;
    this.position = position;
    this.color = color;
    this.size = size;
    this.previousEntry = previous ?? EMPTY_ENTRY;
    this.nextEntry = next ?? EMPTY_ENTRY;
  }
}
