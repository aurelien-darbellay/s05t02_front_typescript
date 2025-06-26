export interface Entry {
  projected: boolean;
  highlighted: boolean;
  type: string;
  displayedType: string;
  codeName: string;
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
  position: Position;
}
interface Colored {
  color: string;
}
interface Sized {
  size: number;
}
export interface ContainerEntry extends Entry, Positioned, Colored, Sized {
  previousEntry: Entry | null;
  nextEntry: Entry | null;
}
export interface ContainedEntry extends Entry {
  id: string;
}

export class ListEntries implements ContainerEntry {
  public type: string;
  public displayedType: string;
  public codeName: string;
  public entries: Entry[];
  public projected: boolean;
  public highlighted: boolean;
  public position: Position;
  public color: string;
  public size: number;
  public previousEntry: Entry | null;
  public nextEntry: Entry | null;

  constructor(
    entries: Entry[],
    projected: boolean,
    highlighted: boolean,
    position: Position,
    color: string,
    size: number,
    previous?: Entry,
    next?: Entry
  ) {
    this.type = 'LIST_' + entries[0].type;
    this.displayedType = entries[0].displayedType;
    this.codeName = 'list' + capitalizeFirstChar(entries[0].codeName);
    this.entries = entries;
    this.projected = projected;
    this.highlighted = highlighted;
    this.position = position;
    this.color = color;
    this.size = size;
    this.previousEntry = previous ?? null;
    this.nextEntry = next ?? null;
  }
}

function capitalizeFirstChar(str: string): string {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
}
