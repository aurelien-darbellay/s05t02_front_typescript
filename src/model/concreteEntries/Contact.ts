import { Entry, Position, ContainerEntry } from '../EntriesGeneralFeatures'; // adjust the import path as needed

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
  public previousEntry: Entry | null;
  public nextEntry: Entry | null;

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
    // Optional previous/next entries
    previousEntry?: Entry,
    nextEntry?: Entry
  ) {
    // Initialize ContainerEntry (and Entry) properties
    this.projected = projected;
    this.highlighted = highlighted;
    this.position = position;
    this.color = color;
    this.size = size;
    this.previousEntry = previousEntry ?? null;
    this.nextEntry = nextEntry ?? null;

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
