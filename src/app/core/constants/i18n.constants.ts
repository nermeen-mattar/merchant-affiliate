import { AvailableLanguageInfo } from './../models/available-language-info.model';

export const availableLanguages: AvailableLanguageInfo[] = [
  {
    code: 'en',
    name: 'English'
  },
  {
    code: 'de',
    name: 'German'
  }
];

export const defaultLanguage = 'en';

export const sysOptions = {
  systemLanguage: defaultLanguage
};

export const languageToDays = {
  de: [ 'Son', 'Mon', 'Die', 'Mit', 'Don', 'Fre', 'Sam'],
  //fr: [fill days in frensh]
}

export const languageToMonths = {
  de: ['JAN', 'FEB', 'MÄR', 'APR', 'KANN', 'JUN', 'JUL', 'AUG', 'SEP', 'OKT', 'DEZ'],
  //fr: [fill days in frensh]
}