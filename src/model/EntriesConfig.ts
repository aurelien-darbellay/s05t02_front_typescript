export const EntryFieldConfig: Record<string, string[]> = {
  CONTACT: [
    'phoneNumber',
    'email',
    'linkedInAccount',
    'gitHubAccount',
    'instagramAccount',
    'facebookAccount',
    'cityOfResidence',
    'zipCode',
  ],
  EDUCATION: [
    'title',
    'trainingCenter',
    'graduationYear',
    'comments',
    'cloudDocumentName',
    'documentCloudMetadata',
  ],
  EXPERIENCE: [
    'role',
    'nameCompany',
    'startDate',
    'endDate',
    'description',
    'keywords',
    'nameLink',
    'linkUrl',
    'cloudDocumentName',
    'documentCloudMetadata',
  ],

  IDENTITY: ['names', 'lastNames'],
  LANGUAGE: ['name', 'level', 'cloudDocumentName', 'documentCloudMetadata'],
  PORTFOLIO: ['projectName', 'projectUrl'],
  PROFESSION: ['generalTitle', 'specificTitle'],
  PROFILE_PICTURE: ['documentCloudMetadata', 'shape'],
  SOFT_SKILL: ['keyWords'],
  SUMMARY: ['title', 'text'],
  TECHNICAL_SKILL: ['keyWords'],
};

export const EntryContainerTypes = [
  'CONTACT',
  'IDENTITY',
  'PROFESSION',
  'PROFILE_PICTURE',
  'SUMMARY',
  'LIST_EDUCATION',
  'LIST_EXPERIENCE',
  'LIST_SOFTSKILL',
  'LIST_TECHNICAL_SKILL',
  'LIST_LANGUAGE',
  'LIST_PORTFOLIO',
];
export const EntryListItemTypes = [
  'EDUCATION',
  'EXPERIENCE',
  'LANGUAGE',
  'PORTFOLIO',
  'SOFT_SKILL',
  'TECHNICAL_SKILL',
];
export const EntryListTypes = [
  'LIST_EDUCATION',
  'LIST_EXPERIENCE',
  'LIST_TECHNICAL_SKILL',
  'LIST_SOFT_SKILL',
  'LIST_LANGUAGE',
  'LIST_PORTFOLIO',
];

export const EntryListKeyWords = ['LIST_TECHNICAL_SKILL', 'LIST_SOFT_SKILL'];
export const matchItemsWithList = {
  EDUCATION: 'LIST_EDUCATION',
  EXPERIENCE: 'LIST_EXPERIENCE',
  LANGUAGE: 'LIST_LANGUAGE',
  PORTFOLIO: 'LIST_PORTFOLIO',
  SOFT_SKILL: 'LIST_SOFT_SKILL',
  TECHNICAL_SKILL: 'LIST_TECHNICAL_SKILL',
};

export const CvEntries = [
  'contact',
  'identity',
  'profession',
  'profilePicture',
  'summary',
  'education',
  'experience',
  'language',
  'portfolio',
  'softSkill',
  'technicalSkill',
];
