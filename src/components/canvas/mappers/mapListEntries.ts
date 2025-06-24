import { TechnicalSkill } from '../../../model/concreteEntries/TechnicalSkill';
import { Education } from '../../../model/concreteEntries/Education';
import { Experience } from '../../../model/concreteEntries/Experience';
import { Language } from '../../../model/concreteEntries/Language';
import { SoftSkill } from '../../../model/concreteEntries/SoftSkill';
import { Portfolio } from '../../../model/concreteEntries/Portfolio';
import { ListEntries } from '../../../model/EntriesGeneralFeatures';

export const mapListEntries = (
  source: any,
  type: string
): ListEntries | null => {
  if (!source?.entries?.length) return null;

  const normalizedPosition = source.position ?? { xCord: 0, yCord: 0 };

  const mappedEntries = source.entries.map((entry: any) => {
    const projected = entry.projected ?? true;
    const highlighted = entry.highlighted ?? false;
    const id = entry.id ?? undefined;

    switch (type) {
      case 'education':
        return new Education(
          entry.title,
          entry.trainingCenter,
          entry.graduationYear,
          entry.comments,
          entry.cloudDocumentName,
          entry.documentCloudMetadata,
          projected,
          highlighted,
          id
        );

      case 'experience':
        return new Experience(
          entry.position,
          entry.nameCompany,
          new Date(entry.startDate),
          new Date(entry.endDate),
          entry.description,
          entry.keywords,
          entry.nameLink,
          entry.linkUrl,
          entry.cloudDocumentName,
          entry.documentCloudMetadata,
          projected,
          highlighted,
          id
        );

      case 'language':
        return new Language(
          entry.name,
          entry.level,
          entry.cloudDocumentName,
          entry.documentCloudMetadata,
          projected,
          highlighted,
          id
        );

      case 'technicalSkill':
        return new TechnicalSkill(entry.name, projected, highlighted, id);

      case 'softSkill':
        return new SoftSkill(entry.keyWords, projected, highlighted, id);

      case 'portfolio':
        return new Portfolio(
          entry.projectName,
          entry.projectUrl,
          projected,
          highlighted,
          id
        );

      default:
        throw new Error(`Unknown list entry type: ${type}`);
    }
  });

  const list = new ListEntries(
    mappedEntries,
    source.projected,
    source.highlighted,
    normalizedPosition,
    source.color,
    source.size,
    source.previousEntry,
    source.nextEntry
  );
  return list;
};
