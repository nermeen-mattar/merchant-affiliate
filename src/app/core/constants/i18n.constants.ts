import { AvailableLanguageInfo } from './../models/available-language-info.model';

export const availableLanguages: AvailableLanguageInfo[] = [
  {
    code: 'en',
    name: 'English'
  },
  {
    code: 'de',
    name: 'German'
  },
  {
    code: 'fr',
    name: 'Frensh'
  }
];

export const defaultLanguage = 'en';

export const sysOptions = {
  systemLanguage: defaultLanguage
};
