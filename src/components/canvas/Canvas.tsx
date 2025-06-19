// Canvas.tsx
import React, { useState } from 'react';
import { ContainerEntry, Position} from '../../model/EntriesGeneralFeatures.ts';
import { Entry } from '../Entry.tsx';
import { ContactComponent } from './entriesComponents/ContactComponent.tsx';
import { EducationComponent } from './entriesComponents/EducationComponent.tsx';
import { ExperienceComponent } from './entriesComponents/ExperienceComponent.tsx';
import { IdentityComponent } from './entriesComponents/IdentityComponent.tsx';
import { LanguageComponent } from './entriesComponents/LanguageComponent.tsx';
import { PortfolioComponent } from './entriesComponents/PortfolioComponent.tsx';
import { ProfessionComponent } from './entriesComponents/ProfessionComponent.tsx';
import { ProfilePictureComponent } from './entriesComponents/ProfilePictureComponent.tsx';
import { SoftSkillComponent } from './entriesComponents/SoftSkillComponent.tsx';
import { SummaryComponent } from './entriesComponents/SummaryComponent.tsx';
import { TechnicalSkillComponent } from './entriesComponents/TechnicalSkillComponent.tsx';

import { ListEntriesComponent } from './entriesComponents/ListEntriesComponent.tsx';
import { ListEntries } from '../../model/EntriesGeneralFeatures.ts';
import { Contact } from '../../model/concreteEntries/Contact.ts';
import { Identity } from '../../model/concreteEntries/Identity.ts';
import { Profession } from '../../model/concreteEntries/Profession.ts';
import { ProfilePicture } from '../../model/concreteEntries/ProfilePicture.ts';
import { Summary } from '../../model/concreteEntries/Summary.ts';
import { mapDocDataToEntries } from './mapDocDataToEntries.ts';

export const Canvas: React.FC = ({docData}) => {
  const listEntries = mapDocDataToEntries(docData);
  const [entries, setEntries] = useState<ContainerEntry[]>(listEntries);

  const updatePosition = (entry: ContainerEntry, newPos: Position) => {
    //console.log("Updating position for entry:", entry.type, "to new position:", newPos);
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
