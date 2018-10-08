import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { BehaviorSubject } from 'rxjs';

import { LoginStatus } from '../../core/models/login-status.model';
@Injectable({
  providedIn: 'root'
})
export class LoginStatusService {
  private loginState: BehaviorSubject < LoginStatus > = new BehaviorSubject({isAuthorized: false});
  /* the event that informs listeners about the updates on the authorization state.*/
  $userLoginState: Observable < any > = this.loginState.asObservable();
  constructor(private router: Router) {
    this.updateLoginStateFromTheLocalStorage();
  }

  /**
   * @author Nermeen Mattar
   * @description Returns the login state of the current user whether logged in or not
   * @returns {LoginStatus}
   */
  getCurrentUserLoginState() {
    return this.loginState.getValue();
  }

  /**
   * @author Nermeen Mattar
   * @description Emits an event to inform listenting components about the updated login status based on the value of the login response.
   */
  updateLoginStateFromTheLocalStorage() {
    this.loginState.next({isAuthorized: Boolean(localStorage.getItem('token'))}); /* on refresh only send isAthorized without token object */
  }

  /**
   * @author Nermeen Mattar
   * @description upon successful user login/switch this function navigates to the events page (default page for authorized users) then emitting the new login status for other components/services
   * @memberof AuthService
   */
  onLoginRequestSuccess() {
    this.router.navigateByUrl('events');
    this.loginState.next({isAuthorized: true});
  }

  /**
   * @author Nermeen Mattar
   * @description logs out the user by navigating to home page (default page for unauthorized users) then emitting the new login status for other components/services
   */
  logout() {
    this.router.navigateByUrl('home');
    this.loginState.next({ isAuthorized: false, logoutResponse: true});
  }

  /**
   * @author Nermeen Mattar
   * checks if the user is authenticated
   * @returns {boolean}
   */
  isAuthenticated(): boolean {
    return this.loginState.getValue().isAuthorized;
  }
}
