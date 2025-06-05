export interface Entry {
  projected: boolean;
  highlighted: boolean;
}
export interface Position {
  xCord: number;
  yCord: number;
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
export abstract class ListEntries<T extends Entry> implements ContainerEntry {
  entries: T[] = new Array<T>();
  getKeyNameInDB(){
    if(this.entries.size==0)
  }
  }
}
