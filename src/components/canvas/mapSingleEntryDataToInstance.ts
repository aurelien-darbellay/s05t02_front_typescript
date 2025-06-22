import { Profession } from "../../model/concreteEntries/Profession";
import { TechnicalSkill } from "../../model/concreteEntries/TechnicalSkill";
import { Identity } from "../../model/concreteEntries/Identity";
import { Education } from "../../model/concreteEntries/Education";
import { Experience } from "../../model/concreteEntries/Experience";
import { Language } from "../../model/concreteEntries/Language";
import { Contact } from "../../model/concreteEntries/Contact";
import { SoftSkill } from "../../model/concreteEntries/SoftSkill";
import { Summary } from "../../model/concreteEntries/Summary";
import { Portfolio } from "../../model/concreteEntries/Portfolio";
import { ProfilePicture } from "../../model/concreteEntries/ProfilePicture";
import { ContainerEntry, ListEntries, EMPTY_ENTRY } from "../../model/EntriesGeneralFeatures"; // assuming this exports the type

export function mapSingleEntryDataToInstance(entryData: any): ContainerEntry | null {
  if (!entryData?.type) return null;

  const type = entryData.type.toLowerCase().replace(/\s/g, "");

  switch (type) {
    case "profession":
      return new Profession(
        entryData.generalTitle,
        entryData.specificTitle,
        entryData.position || { xCord: 0, yCord: 0 },
        entryData.color,
        entryData.size,
        entryData.projected,
        entryData.highlighted,
        entryData.previousEntry,
        entryData.nextEntry
      );

    case "identity":
      return new Identity(
        entryData.position || { xCord: 0, yCord: 0 },
        entryData.color,
        entryData.size,
        entryData.projected,
        entryData.highlighted,
        entryData.previousEntry,
        entryData.nextEntry
      );

    case "profilepicture":
      return new ProfilePicture(
        entryData.urlPicture,
        entryData.shape,
        entryData.position || { xCord: 0, yCord: 0 },
        entryData.color,
        entryData.size,
        entryData.projected,
        entryData.highlighted,
        entryData.previousEntry,
        entryData.nextEntry
      );

    case "contact":
      return new Contact(
        entryData.projected,
        entryData.highlighted,
        entryData.position || { xCord: 0, yCord: 0 },
        entryData.color,
        entryData.size,
        entryData.phoneNumber,
        entryData.email,
        entryData.linkedInAccount,
        entryData.gitHubAccount,
        entryData.instagramAccount,
        entryData.facebookAccount,
        entryData.cityOfResidence,
        entryData.zipCode,
        entryData.previousEntry,
        entryData.nextEntry
      );

    case "summary":
      return new Summary(
        entryData.title,
        entryData.text,
        entryData.position || { xCord: 0, yCord: 0 },
        entryData.color,
        entryData.size,
        entryData.projected,
        entryData.highlighted,
        entryData.previousEntry,
        entryData.nextEntry
      );

    case "education":
    case "experience":
    case "language":
    case "technicalskill":
    case "softskill":
    case "portfolio": {
      const typeToClass: Record<string, any> = {
        education: Education,
        experience: Experience,
        language: Language,
        technicalskill: TechnicalSkill,
        softskill: SoftSkill,
        portfolio: Portfolio,
      };
      const ItemClass = typeToClass[type];
      const listEntry = new ListEntries(
        (entryData.entries || []).map((e: any) => new ItemClass(...Object.values(e))),
        entryData.projected,
        entryData.highlighted,
        entryData.position || { xCord: 0, yCord: 0 },
        entryData.color,
        entryData.size,
        entryData.previousEntry,
        entryData.nextEntry
      );
      listEntry.type = type;
      return listEntry;
    }

    default:
      return null;
  }
}
