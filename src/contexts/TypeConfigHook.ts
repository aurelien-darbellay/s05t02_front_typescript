import { useContext } from 'react';
import { TypesConfigContext } from './TypesConfigProvider';

export const useTypesConfig = () => {
  const cfg = useContext(TypesConfigContext);
  if (cfg === null) {
    throw new Error('useTypesConfig must be used within TypesConfigProvider');
  }
  return cfg;
};