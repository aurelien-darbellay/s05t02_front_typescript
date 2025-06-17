import { TypesConfig } from "../model/TypesConfig";
import axios from '../axiosConfig';

export async function getTypesConfig(): Promise<TypesConfig> {
  const response = await axios.get<TypesConfig>('/config');
  const config = response.data;
  return config;
}