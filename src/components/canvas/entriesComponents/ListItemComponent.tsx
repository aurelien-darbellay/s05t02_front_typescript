import { useContext, useState } from 'react';
import { EditEntryContext } from '../../../contexts/EditEntryContext';
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
import ProjectionToggler from '../ProjectionToggler';

interface ListItemComponentProps {
  entry: Entry;
}

export const ListItemComponent: React.FC<ListItemComponentProps> = ({
  entry,
}) => {
  const { handleEditEntry, setIsListItem } = useContext(EditEntryContext);
  const [hasShadow, setHasShadow] = useState(false);

  const renderEntry = (entry: Entry) => {
    switch (entry.type) {
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
        return null;
    }
  };

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    //console.log('holo');
    setHasShadow(false);
    setIsListItem(true);
    if (handleEditEntry) handleEditEntry(entry);
  };

  const handleMouseEnter = () => {
    setHasShadow(true);
  };

  const handleMouseLeave = () => {
    setHasShadow(false);
  };

  return (
    <li
      onContextMenu={handleContextMenu}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        transition: 'box-shadow 0.2s ease',
        boxShadow: hasShadow ? '0 2px 6px rgba(0,0,0,0.3)' : 'none',
        padding: '8px',
        borderRadius: '4px',
        cursor: 'pointer',
        userSelect: 'none',
      }}
    >
      {renderEntry(entry)}
      <ProjectionToggler entry={entry} />
    </li>
  );
};
