import { Entry, ListEntries } from '../../../model/EntriesGeneralFeatures';
import { ContactComponent } from '../entriesComponents/ContactComponent';
import { IdentityComponent } from '../entriesComponents/IdentityComponent';
import { ProfessionComponent } from '../entriesComponents/ProfessionComponent';
import { ProfilePictureComponent } from '../entriesComponents/ProfilePictureComponent';
import { SummaryComponent } from '../entriesComponents/SummaryComponent';
import { LanguageComponent } from '../entriesComponents/LanguageComponent';
import { ExperienceComponent } from '../entriesComponents/ExperienceComponent';
import { EducationComponent } from '../entriesComponents/EducationComponent';
import { PortfolioComponent } from '../entriesComponents/PortfolioComponent';
import { SoftSkillComponent } from '../entriesComponents/SoftSkillComponent';
import { TechnicalSkillComponent } from '../entriesComponents/TechnicalSkillComponent';
import { Identity } from '../../../model/concreteEntries/Identity';
import { Profession } from '../../../model/concreteEntries/Profession';
import { ProfilePicture } from '../../../model/concreteEntries/ProfilePicture';
import { Summary } from '../../../model/concreteEntries/Summary';
import { Language } from '../../../model/concreteEntries/Language';
import { Experience } from '../../../model/concreteEntries/Experience';
import { Education } from '../../../model/concreteEntries/Education';
import { Portfolio } from '../../../model/concreteEntries/Portfolio';
import { SoftSkill } from '../../../model/concreteEntries/SoftSkill';
import { TechnicalSkill } from '../../../model/concreteEntries/TechnicalSkill';
import { Contact } from '../../../model/concreteEntries/Contact';
import { JSX } from 'react';
import { ListEntriesComponent } from '../entriesComponents/ListEntriesComponent';
import { EntryListTypes } from '../../../model/EntriesConfig';

export const mapEntryToComponent = (entry: Entry): JSX.Element | null => {
  switch (entry.type) {
    case 'CONTACT':
      return <ContactComponent contact={entry as Contact} />;
    case 'IDENTITY':
      return <IdentityComponent identity={entry as Identity} />;
    case 'PROFESSION':
      return <ProfessionComponent profession={entry as Profession} />;
    case 'PROFILE_PICTURE':
      return (
        <ProfilePictureComponent profilePicture={entry as ProfilePicture} />
      );
    case 'SUMMARY':
      return <SummaryComponent summary={entry as Summary} />;
    case 'LANGUAGE':
      return <LanguageComponent language={entry as Language} />;
    case 'EXPERIENCE':
      return <ExperienceComponent experience={entry as Experience} />;
    case 'EDUCATION':
      return <EducationComponent education={entry as Education} />;
    case 'PORTFOLIO':
      return <PortfolioComponent portfolio={entry as Portfolio} />;
    case 'SOFT_SKILL':
      return <SoftSkillComponent softSkill={entry as SoftSkill} />;
    case 'TECHNICAL_SKILL':
      return (
        <TechnicalSkillComponent technicalSkill={entry as TechnicalSkill} />
      );
    default:
      if (EntryListTypes.includes(entry.type))
        return <ListEntriesComponent listEntries={entry as ListEntries} />;
      return null;
  }
};
