import { Position, ContainerEntry } from '../EntriesGeneralFeatures'; // adjust the import path as needed
import { v4 as uuidv4 } from 'uuid';
export class Contact implements ContainerEntry {
  // ContainerEntry (and Entry) properties
  public type: string = 'CONTACT';
  public displayedType: string = 'Contact';
  public codeName: string = 'contact';
  public projected: boolean;
  public highlighted: boolean;
  public position: Position;
  public color: string;
  public size: number;
  public previousEntry: string | null;
  public nextEntry: string | null;
  public id: string | null;
  public header: string;

  // Contact‐specific properties
  public phoneNumber: string;
  public email: string;
  public linkedInAccount: string;
  public gitHubAccount: string;
  public instagramAccount: string;
  public facebookAccount: string;
  public cityOfResidence: string;
  public zipCode: number;

  constructor(
    // Entry / ContainerEntry fields
    header: string,
    position: Position,
    color: string,
    size: number,

    // Contact‐specific fields
    phoneNumber: string,
    email: string,
    linkedInAccount: string,
    gitHubAccount: string,
    instagramAccount: string,
    facebookAccount: string,
    cityOfResidence: string,
    zipCode: number,
    projected: boolean = true,
    highlighted: boolean = false,

    id?: string,
    // Optional previous/next entries
    previousEntry?: string,
    nextEntry?: string
  ) {
    // Initialize ContainerEntry (and Entry) properties
    this.projected = projected;
    this.highlighted = highlighted;
    this.position = position;
    this.color = color;
    this.size = size;
    this.previousEntry = previousEntry ?? null;
    this.nextEntry = nextEntry ?? null;
    this.id = id ?? uuidv4();
    this.header = header;

    // Initialize Contact‐specific properties
    this.phoneNumber = phoneNumber;
    this.email = email;
    this.linkedInAccount = linkedInAccount;
    this.gitHubAccount = gitHubAccount;
    this.instagramAccount = instagramAccount;
    this.facebookAccount = facebookAccount;
    this.cityOfResidence = cityOfResidence;
    this.zipCode = zipCode;
  }
}
