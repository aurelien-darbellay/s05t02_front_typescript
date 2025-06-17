import { useContext } from 'react';
import { TypesConfigContext } from './TypesConfigContext';

export const useTypesConfig = () => {
  const cfg = useContext(TypesConfigContext);
  if (cfg === null) {
    throw new Error('useTypesConfig must be used within TypesConfigProvider');
  }
  return cfg;
};