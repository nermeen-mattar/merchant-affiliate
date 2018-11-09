import { NativeDateAdapter } from '@angular/material';
export class TcDateAdapter extends NativeDateAdapter {

  getFirstDayOfWeek(): number {
    return 1;
  }
  getDayOfWeekNames(): string[] {
    if(localStorage.getItem('lang') === 'de') {
      return [ 'Son', 'Mon', 'Die', 'Mit', 'Don', 'Fre', 'Sam'];
    } else {
      return super.getDayOfWeekNames('short');
    }
  }
  getMonthNames(): string[] {
    if(localStorage.getItem('lang') === 'de') {
      return ['JAN', 'FEB', 'MÄR', 'APR', 'KANN', 'JUN', 'JUL', 'AUG', 'SEP', 'OKT', 'DEZ'];
    } else {
      return super.getMonthNames('short');
    }
  }
  format(date: Date, displayFormat: Object): string {
    if (displayFormat == "input") {
      let day = date.getDate();
      let month = date.getMonth() + 1;
      let year = date.getFullYear();
      return year + '.' + this._to2digit(month) + '.' + this._to2digit(day);
    } else {
      return date.toDateString();
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
// export const MY_DATE_FORMATS = {
//   display: {
//     // dateInput: { month: 'short', year: 'numeric', day: 'numeric' },
//     dateInput: 'input',
//     monthYearLabel: {year: 'numeric', month: 'short'},
//     dateA11yLabel: {year: 'numeric', month: 'long', day: 'numeric'},
//     monthYearA11yLabel: {year: 'numeric', month: 'long'},
//   }
// };
