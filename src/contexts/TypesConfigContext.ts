import { createContext } from 'react';
import { TypesConfig } from '../model/TypesConfig';
export const TypesConfigContext = createContext<TypesConfig | null>(null);