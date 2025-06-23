// TypesConfigContext.tsx

// @refresh reset

import React, {useEffect, useState } from 'react';
import { getTypesConfig } from '../helpers/GeneralFetchers'
import { TypesConfig } from '../model/TypesConfig';
import { TypesConfigContext } from './TypesConfigContext';

export const TypesConfigProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const [config, setConfig] = useState<TypesConfig | null>(null);
  //console.log("Mounting TypesConfigProvider");
  useEffect(() => {
    (async () => {
      const cfg = await getTypesConfig();
      setConfig(cfg);
    })();
  }, []);

  if (config === null) {
    return <div>Loading...</div>; // or a spinner, or any loading indicator
  }

  return (
    <TypesConfigContext.Provider value={config}>
      {children}
    </TypesConfigContext.Provider>
  );
};


