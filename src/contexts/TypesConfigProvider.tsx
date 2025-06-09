// TypesConfigContext.tsx

// @refresh reset

import React, { createContext, useContext, useEffect, useState } from 'react';
import { getTypesConfig } from '../helpers/GeneralFetchers'
import { TypesConfig } from '../model/TypesConfig';
const TypesConfigContext = createContext<TypesConfig | null>(null);

export const TypesConfigProvider: React.FC = ({ children }) => {
  const [config, setConfig] = useState<TypesConfig | null>(null);

  useEffect(() => {
    (async () => {
      const cfg = await getTypesConfig();
      setConfig(cfg);
    })();
  }, []);

  // Optional: sync back to localStorage if you ever update it in-app
  useEffect(() => {
    if (config) {
      try {
        localStorage.setItem('typesconfig', JSON.stringify(config));
      } catch {}
    }
  }, [config]);

  return (
    <TypesConfigContext.Provider value={config}>
      {children}
    </TypesConfigContext.Provider>
  );
};

export const useTypesConfig = () => {
  const cfg = useContext(TypesConfigContext);
  if (cfg === null) {
    throw new Error('useTypesConfig must be used within TypesConfigProvider');
  }
  return cfg;
};


