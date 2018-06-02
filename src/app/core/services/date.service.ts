import { Injectable } from '@angular/core';

import { TcDateRange } from '../models/tc-date-range.model';

@Injectable({
  providedIn: 'root'
})
export class DateService {
  _selectedDateRange: TcDateRange;
  constructor() {
    this.selectedDateRange = JSON.parse(localStorage.getItem('selectedDateRange'));
  }


  /**
   * @author Nermeen Mattar
   * @description returns the date range the user has selected.
   */
  get selectedDateRange(): TcDateRange {
    if (!this._selectedDateRange) {
      const yesterdayDate =  new Date();
      yesterdayDate.setDate(yesterdayDate.getDate() - 1);
      this.selectedDateRange =  { dateForm: String(yesterdayDate), dateTo: String(new Date())};
    }
    return this._selectedDateRange;
  }

  /**
   * @author Nermeen Mattar
   * @description sets the selected the date range in a private variable and in the localstorage.
   */
  set selectedDateRange(selectedDateRange: TcDateRange) {
    this._selectedDateRange = selectedDateRange;
    if (selectedDateRange) {
      localStorage.setItem('selectedDateRange', JSON.stringify(selectedDateRange));
    } else {
      localStorage.removeItem('selectedDateRange');
    }
  }
}
