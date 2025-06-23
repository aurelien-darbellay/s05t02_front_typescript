import { Profession } from "../../../model/concreteEntries/Profession";
import { TechnicalSkill } from "../../../model/concreteEntries/TechnicalSkill";
import { Identity } from "../../../model/concreteEntries/Identity";
import { Education } from "../../../model/concreteEntries/Education";
import { Experience } from "../../../model/concreteEntries/Experience";
import { Language } from "../../../model/concreteEntries/Language";
import { Contact } from "../../../model/concreteEntries/Contact";
import { SoftSkill } from "../../../model/concreteEntries/SoftSkill";
import { Summary } from "../../../model/concreteEntries/Summary";
import { Portfolio } from "../../../model/concreteEntries/Portfolio";
import { ProfilePicture } from "../../../model/concreteEntries/ProfilePicture";
import { ContainerEntry, ListEntries} from "../../../model/EntriesGeneralFeatures"; // assuming this exports the type

export function mapDocDataToEntries(docData: any): ContainerEntry[] {
  const entries: ContainerEntry[] = [];

  function normalizePosition(position: any) { 
    if (!position) return null;
    return {
      xCord: position.xcord ?? 0,
      yCord: position.ycord ?? 0,
      }; 
  } 


  if (docData.profession) {
    const p = docData.profession;
    p.position = normalizePosition(p.position);
    entries.push(
      new Profession(
        p.generalTitle,
        p.specificTitle,
        p.position,
        p.color,
        p.size,
        p.projected,
        p.highlighted,
        p.previousEntry,
        p.nextEntry
      )
    );
  }

  if (docData.identity) {
    const i = docData.identity;
    i.position = normalizePosition(i.position);
    entries.push(
      new Identity(
        i.position,
        i.color,
        i.size,
        i.projected,
        i.highlighted,
        i.previousEntry,
        i.nextEntry
      )
    );
  }

  if (docData.profilePicture) {
    const pp = docData.profilePicture;
    pp.position = normalizePosition(pp.position);
    entries.push(
      new ProfilePicture(
        pp.urlPicture,
        pp.shape,
        pp.position,
        pp.color,
        pp.size,
        pp.projected,
        pp.highlighted,
        pp.previousEntry,
        pp.nextEntry
      )
    );
  }

  if (docData.contact) {
    const c = docData.contact;
    c.position = normalizePosition(c.position);
    entries.push(
      new Contact(
        c.projected,
        c.highlighted,
        c.position,
        c.color,
        c.size,
        c.phoneNumber,
        c.email,
        c.linkedInAccount,
        c.gitHubAccount,
        c.instagramAccount,
        c.facebookAccount,
        c.cityOfResidence,
        c.zipCode,
        c.previousEntry,
        c.nextEntry
      )
    );
  }

  if (docData.summary) {
    const s = docData.summary;
    s.position = normalizePosition(s.position);
    entries.push(
      new Summary(
        s.title,
        s.text,
        s.position,
        s.color,
        s.size,
        s.projected,
        s.highlighted,
        s.previousEntry,
        s.nextEntry
      )
    );
  }

  const mapListEntries = (
    source: any,
    ItemClass: any
  ): ListEntries | null => {
    if (!source?.entries?.length) return null;
    const list = new ListEntries(
      source.entries.map((e: any) => new ItemClass(...Object.values(e))),
      source.projected,
      source.highlighted,
      source.position,
      source.color,
      source.size,
      source.previousEntry,
      source.nextEntry
    );
    list.type = source.keyNameInDB; // inferred type
    return list;
  };

  const structuredBlocks = [
    { data: docData.education, klass: Education },
    { data: docData.experience, klass: Experience },
    { data: docData.language, klass: Language },
    { data: docData.technicalSkill, klass: TechnicalSkill },
    { data: docData.softSkill, klass: SoftSkill },
    { data: docData.portfolio, klass: Portfolio }
  ];

  for (const block of structuredBlocks) {
    if (block.data) block.data.position = normalizePosition(block.data.position);
    const listEntry = mapListEntries(block.data, block.klass);
    if (listEntry) entries.push(listEntry);
  }

  return entries;
}
