import { Injectable } from '@angular/core';

import { TcDateRange } from '../models/tc-date-range.model';
import { LoginStatusService } from '../../auth/services/login-status.service';

@Injectable({
  providedIn: 'root'
})
export class DateService {
  private _selectedDateRange: TcDateRange;
  constructor(loginStatusService: LoginStatusService) {
    loginStatusService.$userLoginState.subscribe(isUserLoggedIn => {
      if (!isUserLoggedIn) {
        this.resetData();
      }
    });
    const dateRange = JSON.parse(localStorage.getItem('selectedDateRange'));
    if (dateRange) {
      this.selectedDateRange = {dateFrom: new Date(dateRange.dateFrom), dateTo: new Date(dateRange.dateTo) };
    }
  }


  /**
   * @author Nermeen Mattar
   * @description returns the date range the user has selected.
   */
  get selectedDateRange(): TcDateRange {
    if (!this._selectedDateRange) {
      const todayDate =  new Date();
      this.selectedDateRange =  { dateFrom: new Date('01/01/' + todayDate.getFullYear()), dateTo: todayDate};
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

  /**
   * @author Nermeen Mattar
   * @description resets the class variables.
   */
  resetData() {
    this.selectedDateRange = null;
  }
}
