import { TypesConfig } from "../model/TypesConfig";

export async function getTypesConfig(): Promise<TypesConfig> {
  // 1) Check localStorage
  const cached = localStorage.getItem('typesconfig');
  if (cached) {
    try {
      return JSON.parse(cached) as TypesConfig;
    } catch {
      // If parsing fails, we'll re-fetch below
    }
  }

  // 2) Fetch from backend
  const response = await axios.get<TypesConfig>('/config');
  const config = response.data;

  // 3) Save into localStorage
  try {
    localStorage.setItem('typesconfig', JSON.stringify(config));
  } catch (e) {
    console.warn('Could not persist typesconfig to localStorage', e);
  }

  return config;
}