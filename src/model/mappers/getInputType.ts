import { useTypesConfig } from '../../contexts/TypesConfigHook';

type InputType =
  | {
      kind:
        | 'text'
        | 'email'
        | 'url'
        | 'date'
        | 'color'
        | 'tel'
        | 'number'
        | 'password'
        | 'cloudMetadata'
        | 'ignore';
    }
  | { kind: 'textarea'; maxLength?: number }
  | { kind: 'select'; options: string[] }
  | { kind: 'custom'; component: string }; // e.g. for special cases

export const useGetInputType = () => {
  const cfg = useTypesConfig();

  const getInputType = (selectedType: string, fieldName: string): InputType => {
    //console.log('finding types');
    const type = selectedType.toLowerCase();
    const field = fieldName.toLowerCase();

    // Special logic for Language.level field
    if (type === 'language' && field === 'level') {
      return { kind: 'select', options: cfg.linguisticLevels };
    }
    if (type === 'profile_picture') {
      if (field === 'shape')
        return { kind: 'select', options: cfg.pictureShapes };
      else if (field === 'documentcloudmetadata')
        return { kind: 'cloudMetadata' };
    }

    // Summary.text as paragraph input
    if (
      (type === 'summary' && field === 'text') ||
      (type === 'education' && field === 'comments')
    ) {
      return { kind: 'textarea', maxLength: 300 };
    }

    // Specific case for custom Cloudinary metadata object
    if (field === 'documentcloudmetadata') {
      return { kind: 'cloudMetadata' };
    }
    if (field === 'clouddocumentname') {
      //console.log('cloudDocumentName');
      return { kind: 'ignore' };
    }

    // Generic field rules
    if (field.includes('email')) return { kind: 'email' };
    if (
      field.includes('url') ||
      field.includes('link') ||
      field.includes('portfolio')
    )
      return { kind: 'url' };
    if (field.includes('date') || field.includes('birth'))
      return { kind: 'date' };
    if (field.includes('color')) return { kind: 'color' };
    if (field.includes('phone')) return { kind: 'tel' };
    if (
      field.includes('number') ||
      field.includes('years') ||
      field.includes('score')
    )
      return { kind: 'number' };
    if (field.includes('password')) return { kind: 'password' };

    return { kind: 'text' };
  };

  return getInputType;
};
