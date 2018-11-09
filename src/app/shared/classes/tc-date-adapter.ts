import { NativeDateAdapter } from '@angular/material';

import { languageToMonthsNames } from './../../core/constants/i18n.constants';
import { languageToDaysNames } from '../../core/constants/i18n.constants';
export class TcDateAdapter extends NativeDateAdapter {

  /**
   * @author Nermeen Mattar
   * @description making monday appear as the first day in the week in the calendar 
   * @returns {number}
   */
  getFirstDayOfWeek(): number {
    return 1;
  }

  /**
   * @author Nermeen Mattar
   * @description attempts to get the days of week on the selected language if exists in i18n constants, if not it calls the super class to get the
   * default week names (English is the default)
   * @returns {string[]}
   */
  getDayOfWeekNames(): string[] {
    const languagePreference = this.getLanguagePreferenceIfExist(languageToDaysNames);
    return languagePreference ? languageToDaysNames[languagePreference] : super.getDayOfWeekNames('short');
  }

  /**
   * @author Nermeen Mattar
   * @description attempts to get the months on the selected language if exists in i18n constants, if not it calls the super class to get the
   * default months' names (English is the default)
   * @returns {string[]}
   */
  getMonthNames(): string[] {
    const languagePreference = this.getLanguagePreferenceIfExist(languageToMonthsNames);
    return languagePreference ? languageToMonthsNames[languagePreference] : super.getMonthNames('short');
  }

  /**
   * @author Nermeen Mattar
   * @description shared function that attempts to get the language preference for the selected language (if exists in the passed language data object)
   * @returns {string}
   */
  getLanguagePreferenceIfExist(languageDateObj): string {
    const selectedLang = localStorage.getItem('lang');
    return Object.keys(languageDateObj).find(langCode => selectedLang === langCode);
  }

  /**
   * @author Nermeen Mattar
   * @description formats the displayed date (only for inputs) to follow the required format yyyy.mm.dd
   * @param {Date} date
   * @param {Object} displayFormat
   * @returns {string}
   */
  format(date: Date, displayFormat: Object): string {
    if (displayFormat == "input") {
      let day = date.getDate();
      let month = date.getMonth() + 1;
      let year = date.getFullYear();
      return year + '.' + this._to2digit(month) + '.' + this._to2digit(day);
    } else {
      return date.toDateString().replace(/^.{3} /, '');
    }
  }

  private _to2digit(n: number) {
    return ('00' + n).slice(-2);
  }
}

export const MY_DATE_FORMATS = {
  parse: {
    dateInput: 'input',
  },
  display: {
    dateInput: 'input',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'input',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};
