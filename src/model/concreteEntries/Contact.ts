import {
  Entry,
  Position,
  ContainerEntry,
  EMPTY_ENTRY,
} from '../EntriesGeneralFeatures'; // adjust the import path as needed

export class Contact implements ContainerEntry {
  // ContainerEntry (and Entry) properties
  public type: string = "CONTACT";
  public displayedType: string = "Contact";
  public keyNameInDB: string = "contact";
  public projected: boolean;
  public highlighted: boolean;
  public position: Position;
  public color: string;
  public size: number;
  public previousEntry: Entry;
  public nextEntry: Entry;

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
    projected: boolean,
    highlighted: boolean,
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
    this.previousEntry = previousEntry ?? EMPTY_ENTRY;
    this.nextEntry = nextEntry ?? EMPTY_ENTRY;

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
