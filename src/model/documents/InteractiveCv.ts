import { Profession } from "../../model/concreteEntries/Profession";
import { Identity } from "../../model/concreteEntries/Identity";
import { Contact } from "../../model/concreteEntries/Contact";
import { Summary } from "../../model/concreteEntries/Summary";
import { ProfilePicture } from "../../model/concreteEntries/ProfilePicture";
import {ListEntries} from "../../model/EntriesGeneralFeatures"; // assuming this exports the type
import { InteractiveDocument } from "./InteractiveDocument";

export class InteractiveCv implements InteractiveDocument{
  "@class":string = "s05t02.interactiveCV.model.documents.cv.InteractiveCv"; 
  id: string;
  title: string;
  identity: Identity | null;
  profession: Profession | null;
  profilePicture: ProfilePicture | null;
  contact: Contact | null;
  summary: Summary | null;
  education: ListEntries | null;
  experience: ListEntries| null;
  language: ListEntries| null;
  technicalSkill: ListEntries| null;
  softSkill: ListEntries| null;
  portfolio: ListEntries | null;

  constructor(
    id: string,
    title: string,
    identity: Identity | null = null,
    profession: Profession | null = null,
    profilePicture: ProfilePicture | null = null,
    contact: Contact | null = null,
    summary: Summary | null = null,
    education: ListEntries | null = null,
    experience: ListEntries | null = null,
    language: ListEntries| null = null,
    technicalSkill: ListEntries | null = null,
    softSkill: ListEntries| null = null,
    portfolio: ListEntries | null = null
  ) {
    this.id = id;
    this.title = title;
    this.identity = identity;
    this.profession = profession;
    this.profilePicture = profilePicture;
    this.contact = contact;
    this.summary = summary;
    this.education = education;
    this.experience = experience;
    this.language = language;
    this.technicalSkill = technicalSkill;
    this.softSkill = softSkill;
    this.portfolio = portfolio;
  }
}