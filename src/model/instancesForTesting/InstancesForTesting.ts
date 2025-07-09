// instances.ts

import { CloudinaryMetaData } from '../cloud/CloudMetaData';
import { Contact } from '../concreteEntries/Contact';
import { Education } from '../concreteEntries/Education';
import { Experience } from '../concreteEntries/Experience';
import { Identity } from '../concreteEntries/Identity';
import { Language, Level } from '../concreteEntries/Language';
import { Portfolio } from '../concreteEntries/Portfolio';
import { Profession } from '../concreteEntries/Profession';
import { ProfilePicture, Shape } from '../concreteEntries/ProfilePicture';
import { SoftSkill } from '../concreteEntries/SoftSkill';
import { Summary } from '../concreteEntries/Summary';
import { TechnicalSkill } from '../concreteEntries/TechnicalSkill';
import { ListEntries } from '../EntriesGeneralFeatures';

import { Position, CloudMetaData } from '../EntriesGeneralFeatures';

// Dummy CloudMetaData for testing
const dummyCloudMetaData: CloudMetaData = {} as CloudMetaData;

// A default Position object
const defaultPosition: Position = { xCord: 0, yCord: 0 };

// -------- Contact instance --------
const contactInstance = new Contact(
  /* projected */ true,
  /* highlighted */ false,
  /* position */ { xCord: 10, yCord: 20 },
  /* color */ 'blue',
  /* size */ 12,
  /* phoneNumber */ '555-1234',
  /* email */ 'jane.doe@example.com',
  /* linkedInAccount */ 'jane-doe-linkedin',
  /* gitHubAccount */ 'jane-doe-github',
  /* instagramAccount */ 'jane.doe.ig',
  /* facebookAccount */ 'jane.doe.fb',
  /* cityOfResidence */ 'Madrid',
  /* zipCode */ 28001,
  /* previousEntry? */ undefined,
  /* nextEntry? */ undefined
);

// -------- Education instance --------
const educationInstance = new Education(
  /* title */ 'Bachelor of Science in Computer Science',
  /* trainingCenter */ 'Universidad Complutense de Madrid',
  /* graduationYear */ 2020,
  /* comments */ 'Graduated with honors',
  /* cloudDocumentName */ 'degree_certificate.pdf',
  /* documentCloudMetadata */ dummyCloudMetaData,
  /* projected */ false,
  /* highlighted */ true,
  /* id? */ undefined
);

// -------- Experience instance --------
const experienceInstance = new Experience(
  /* position */ 'Software Engineer',
  /* nameCompany */ 'TechCorp S.A.',
  /* startDate */ new Date('2021-01-15'),
  /* endDate */ new Date('2023-06-30'),
  /* description */ 'Developed and maintained web applications.',
  /* keywords */ ['TypeScript', 'React', 'Node.js'],
  /* nameLink */ 'TechCorp Website',
  /* linkUrl */ 'https://www.techcorp.example.com',
  /* cloudDocumentName */ 'experience_certificate.pdf',
  /* documentCloudMetadata */ dummyCloudMetaData,
  /* projected */ true,
  /* highlighted */ false,
  /* id? */ undefined
);

// -------- Identity instance --------
const identityInstance = new Identity(
  /* position */ { xCord: 5, yCord: 5 },
  /* color */ 'green',
  /* size */ 8,
  /* projected */ false,
  /* highlighted */ false,
  /* previousEntry? */ undefined,
  /* nextEntry? */ undefined
);
identityInstance.names = ['Jane', 'Maria'];
identityInstance.lastNames = ['Doe', 'González'];

// -------- Language instance --------
const languageInstance = new Language(
  /* name */ 'Spanish',
  /* level */ Level.NATIVE,
  /* cloudDocumentName */ 'spanish_certificate.pdf',
  /* documentCloudMetadata */ dummyCloudMetaData,
  /* projected */ false,
  /* highlighted */ true,
  /* id? */ undefined
);

// -------- Portfolio instance --------
const portfolioInstance = new Portfolio(
  /* projectName */ 'Personal Website',
  /* projectUrl */ 'https://www.janedoe.dev',
  /* projected */ true,
  /* highlighted */ true,
  /* id? */ undefined
);

// -------- Profession instance --------
const professionInstance = new Profession(
  /* generalTitle */ 'Engineering',
  /* specificTitle */ 'Full Stack Developer',
  /* position */ { xCord: 15, yCord: 30 },
  /* color */ 'red',
  /* size */ 10,
  /* projected */ false,
  /* highlighted */ false,
  /* previousEntry? */ undefined,
  /* nextEntry? */ undefined
);

// -------- ProfilePicture instance --------
const profilePictureInstance = new ProfilePicture(
  new CloudinaryMetaData('example', 'https://www.example.com/images/jane.jpg'),
  /* shape */ Shape.ROUND,
  /* position */ { xCord: 0, yCord: 0 },
  /* color */ 'transparent',
  /* size */ 50,
  /* projected */ true,
  /* highlighted */ true,
  /* previousEntry? */ undefined,
  /* nextEntry? */ undefined
);

// -------- SoftSkill instance --------
const softSkillInstance = new SoftSkill(
  /* keyWords */ 'Communication, Teamwork, Leadership',
  /* projected */ false,
  /* highlighted */ false,
  /* id? */ undefined
);

// -------- Summary instance --------
const summaryInstance = new Summary(
  /* title */ 'Professional Summary',
  /* text */ 'Experienced software engineer with a passion for front-end development.',
  /* position */ { xCord: 2, yCord: 2 },
  /* color */ 'black',
  /* size */ 14,
  /* projected */ true,
  /* highlighted */ false,
  /* previousEntry? */ undefined,
  /* nextEntry? */ undefined
);

// -------- TechnicalSkill instance --------
const technicalSkillInstance = new TechnicalSkill(
  /* keyWords */ 'TypeScript, React, Node.js, SQL',
  /* projected */ true,
  /* highlighted */ true,
  /* id? */ undefined
);

// -------- ListEntries instance --------
const listEntriesInstance = new ListEntries(
  /* entries */ [educationInstance],
  /* projected */ true,
  /* highlighted */ false,
  /* position */ { xCord: 100, yCord: 200 },
  /* color */ 'purple',
  /* size */ 20,
  /* previousEntry? */ contactInstance,
  /* nextEntry? */ educationInstance
);

// Export all instances for easy testing
export {
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
};
