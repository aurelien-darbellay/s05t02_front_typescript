import { EntryTypesFormatter } from './entryTypesFormatter';

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
    type?: string,
    previous?: Entry,
    next?: Entry
  ) {
    this.type = type ? 'LIST_' + type : 'LIST_' + entries[0].type;
    this.displayedType = type
      ? EntryTypesFormatter.fromConstantToDisplay(type)
      : entries[0].displayedType;
    this.codeName = type
      ? 'list' +
        capitalizeFirstChar(EntryTypesFormatter.fromConstantToCamel(type))
      : 'list' + capitalizeFirstChar(entries[0].codeName);
    this.entries = entries;
    this.projected = projected;
    this.highlighted = highlighted;
    this.position = position;
    this.color = color;
    this.size = size;
    this.previousEntry = previous ?? null;
    this.nextEntry = next ?? null;
  }
  static from(entry: ListEntries): ListEntries {
    return new ListEntries(
      [...entry.entries],
      entry.projected,
      entry.highlighted,
      { ...entry.position },
      entry.color,
      entry.size,
      EntryTypesFormatter.fromListToItem(entry.type),
      entry.previousEntry,
      entry.nextEntry
    );
  }
}

function capitalizeFirstChar(str: string): string {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
}
