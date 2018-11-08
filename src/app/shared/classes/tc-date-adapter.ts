import { NativeDateAdapter } from '@angular/material';

export class TcDateAdapter extends NativeDateAdapter  {
  
  getFirstDayOfWeek(): number {
    return 1;
  }
  getDayOfWeekNames(): string[] {
    return ['M', 'D', 'M', 'D', 'F', 'S', 'S'];
  }
  getMonthNames(): string[] {
    return ['JAN', 'FEB', 'MÄR', 'APR', 'KANN', 'JUN', 'JUL', 'AUG', 'SEP', 'OKT', 'DEZ'];
  }
  // export const MY_DATE_FORMATS = {
  //   parse: {
  //     dateInput: 'LL',
  //   },
  //   display: {
  //     dateInput: 'LL',
  //     monthYearLabel: 'MMM YYYY',
  //     dateA11yLabel: 'LL',
  //     monthYearA11yLabel: 'MMMM YYYY',
  //   },
  // };
  
}
