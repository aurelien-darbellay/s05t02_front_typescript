// Canvas.tsx
import React, { useState } from 'react';
import { ContainerEntry, Position} from '../model/EntriesGeneralFeatures';
import { Entry } from './Entry';
import { ContactComponent } from './entriesComponents/ContactComponent';
import { EducationComponent } from './entriesComponents/EducationComponent';
import { ExperienceComponent } from './entriesComponents/ExperienceComponent';
import { IdentityComponent } from './entriesComponents/IdentityComponent';
import { LanguageComponent } from './entriesComponents/LanguageComponent';
import { PortfolioComponent } from './entriesComponents/PortfolioComponent';
import { ProfessionComponent } from './entriesComponents/ProfessionComponent';
import { ProfilePictureComponent } from './entriesComponents/ProfilePictureComponent';
import { SoftSkillComponent } from './entriesComponents/SoftSkillComponent';
import { SummaryComponent } from './entriesComponents/SummaryComponent';
import { TechnicalSkillComponent } from './entriesComponents/TechnicalSkillComponent';
import {
  contactInstance,
  educationInstance,
  experienceInstance,
  identityInstance,
  languageInstance,
  portfolioInstance,
  professionInstance,
  profilePictureInstance,
  softSkillInstance,
  summaryInstance,
  technicalSkillInstance,
  listEntriesInstance,
} from '../model/instancesForTesting/InstancesForTesting';

import { ListEntriesComponent } from './entriesComponents/ListEntriesComponent';
import { ListEntries } from '../model/EntriesGeneralFeatures';
import { Contact } from '../model/concreteEntries/Contact';
import { Identity } from '../model/concreteEntries/Identity';
import { Profession } from '../model/concreteEntries/Profession';
import { ProfilePicture } from '../model/concreteEntries/ProfilePicture';
import { Summary } from '../model/concreteEntries/Summary';

export const Canvas: React.FC = () => {
  // Initialize with some ContainerEntry instances
  const [entries, setEntries] = useState<ContainerEntry[]>([
    identityInstance,
    summaryInstance,
    listEntriesInstance
    
  ]);

  const updatePosition = (entry: ContainerEntry, newPos: Position) => {
    // Mutate the entry's position and trigger re-render
    entry.position = newPos;
    setEntries((prev) => [...prev]);
  };

  const renderConcrete = (entry: ContainerEntry) => {
    if (entry instanceof Contact) {
      return <ContactComponent contact={entry as Contact} />;
    }
    if (entry instanceof Identity) {
      return <IdentityComponent identity={entry as Identity} />;
    }
    if (entry instanceof Profession) {
      return <ProfessionComponent profession={entry as Profession} />;
    }
    if (entry instanceof ProfilePicture) {
      return <ProfilePictureComponent profilePicture={entry as ProfilePicture} />;
    }
    
    if (entry instanceof Summary) {
      return <SummaryComponent summary={entry as Summary} />;
    }
    if (entry instanceof ListEntries) {
      return <ListEntriesComponent listEntries={entry as ListEntries} />;
    }
    return null;
  };

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        backgroundColor: '#f0f0f0',
        overflow: 'hidden',
      }}
    >
      {entries.map((entry, idx) => (
        <Entry key={idx} entry={entry} onPositionChange={updatePosition}>
          {renderConcrete(entry)}
        </Entry>
      ))}
    </div>
  );
};
