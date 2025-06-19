// ListEntriesComponent.tsx
import React from 'react';
import {ListEntries } from '../../../model/EntriesGeneralFeatures';
import { Entry } from '../../../model/EntriesGeneralFeatures';
import { Language } from '../../../model/concreteEntries/Language';
import { Experience } from '../../../model/concreteEntries/Experience';
import { Education } from '../../../model/concreteEntries/Education';
import { Portfolio } from '../../../model/concreteEntries/Portfolio';
import { TechnicalSkill } from '../../../model/concreteEntries/TechnicalSkill';
import { SoftSkill } from '../../../model/concreteEntries/SoftSkill';
import { LanguageComponent } from './LanguageComponent';
import { ExperienceComponent } from './ExperienceComponent'; 
import { EducationComponent } from './EducationComponent';
import { PortfolioComponent } from './PortfolioComponent';
import { SoftSkillComponent } from './SoftSkillComponent';
import { TechnicalSkillComponent } from './TechnicalSkillComponent';


interface ListEntriesComponentProps{
  listEntries: ListEntries;
}

export const ListEntriesComponent: React.FC<ListEntriesComponentProps> = ({
  listEntries}) =>{
    const renderEntry =(entry:Entry) =>{
      switch (entry.type) {
        case 'language':
          return <LanguageComponent language={entry as Language} />;
        case 'experience':
          return <ExperienceComponent experience={entry as Experience} />;
        case 'education':
          return <EducationComponent education={entry as Education} />;
        case 'portfolio':
          return <PortfolioComponent portfolio={entry as Portfolio} />;
        case 'softSkill':
          return <SoftSkillComponent softSkill={entry as SoftSkill} />;
        case 'technicalSkill':
          return <TechnicalSkillComponent technicalSkill={entry as TechnicalSkill} />;
        default:
          return null;
      }
    }
  return (
    <div>
      <ul>
        {listEntries.entries.map((entry, index) => (
          <li key={index}>
            {renderEntry(entry)}
          </li>
        ))}
      </ul>
    </div>
  );
}
