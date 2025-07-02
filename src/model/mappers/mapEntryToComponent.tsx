import { Entry, ListEntries } from '../EntriesGeneralFeatures';
import { ContactComponent } from '../../components/canvas/entriesComponents/ContactComponent';
import { IdentityComponent } from '../../components/canvas/entriesComponents/IdentityComponent';
import { ProfessionComponent } from '../../components/canvas/entriesComponents/ProfessionComponent';
import { ProfilePictureComponent } from '../../components/canvas/entriesComponents/ProfilePictureComponent';
import { SummaryComponent } from '../../components/canvas/entriesComponents/SummaryComponent';
import { LanguageComponent } from '../../components/canvas/entriesComponents/LanguageComponent';
import { ExperienceComponent } from '../../components/canvas/entriesComponents/ExperienceComponent';
import { EducationComponent } from '../../components/canvas/entriesComponents/EducationComponent';
import { PortfolioComponent } from '../../components/canvas/entriesComponents/PortfolioComponent';
import { SoftSkillComponent } from '../../components/canvas/entriesComponents/SoftSkillComponent';
import { TechnicalSkillComponent } from '../../components/canvas/entriesComponents/TechnicalSkillComponent';
import { Identity } from '../concreteEntries/Identity';
import { Profession } from '../concreteEntries/Profession';
import { ProfilePicture } from '../concreteEntries/ProfilePicture';
import { Summary } from '../concreteEntries/Summary';
import { Language } from '../concreteEntries/Language';
import { Experience } from '../concreteEntries/Experience';
import { Education } from '../concreteEntries/Education';
import { Portfolio } from '../concreteEntries/Portfolio';
import { SoftSkill } from '../concreteEntries/SoftSkill';
import { TechnicalSkill } from '../concreteEntries/TechnicalSkill';
import { Contact } from '../concreteEntries/Contact';
import { JSX } from 'react';
import { ListEntriesComponent } from '../../components/canvas/entriesComponents/ListEntriesComponent';
import { EntryListTypes } from '../EntriesConfig';

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
