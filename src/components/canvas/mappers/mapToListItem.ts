import { Education } from '../../../model/concreteEntries/Education';
import { Experience } from '../../../model/concreteEntries/Experience';
import { Language } from '../../../model/concreteEntries/Language';
import { Portfolio } from '../../../model/concreteEntries/Portfolio';
import { SoftSkill } from '../../../model/concreteEntries/SoftSkill';
import { TechnicalSkill } from '../../../model/concreteEntries/TechnicalSkill';
import { ContainedEntry } from '../../../model/EntriesGeneralFeatures';

export const mapToListItem = (
  entryData: any,
  id?,
  projected?,
  highlighted?
): ContainedEntry => {
  const type = entryData.type;
  if (projected === undefined) projected = true;
  if (highlighted === undefined) highlighted = false;
  let mappedEntry;
  switch (type) {
    case 'EDUCATION':
      mappedEntry = new Education(
        entryData.title,
        entryData.trainingCenter,
        entryData.graduationYear,
        entryData.comments,
        entryData.cloudDocumentName,
        entryData.documentCloudMetadata,
        projected,
        highlighted,
        id
      );
      break;

    case 'EXPERIENCE':
      mappedEntry = new Experience(
        entryData.role,
        entryData.nameCompany,
        new Date(entryData.startDate),
        new Date(entryData.endDate),
        entryData.description,
        entryData.keywords,
        entryData.nameLink,
        entryData.linkUrl,
        entryData.cloudDocumentName,
        entryData.documentCloudMetadata,
        projected,
        highlighted,
        id
      );
      break;

    case 'LANGUAGE':
      mappedEntry = new Language(
        entryData.name,
        entryData.level,
        entryData.cloudDocumentName,
        entryData.documentCloudMetadata,
        projected,
        highlighted,
        id
      );
      break;

    case 'TECHNICAL_SKILL':
      mappedEntry = new TechnicalSkill(
        entryData.name,
        projected,
        highlighted,
        id
      );
      break;
    case 'SOFT_SKILL':
      mappedEntry = new SoftSkill(
        entryData.keyWords,
        projected,
        highlighted,
        id
      );
      break;
    case 'PORTFOLIO':
      mappedEntry = new Portfolio(
        entryData.projectName,
        entryData.projectUrl,
        projected,
        highlighted,
        id
      );
      break;
  }
  return mappedEntry;
};
