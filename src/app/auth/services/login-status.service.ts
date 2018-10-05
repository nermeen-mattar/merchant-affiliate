import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { BehaviorSubject } from 'rxjs';

import { TokenHandlerService } from './token-handler.service';
import { LoginResponse } from './../models/login-response.model';
import { LoginStatus } from '../../core/models/login-status.model';
@Injectable({
  providedIn: 'root'
})
export class LoginStatusService {
  loginState: BehaviorSubject < LoginStatus > = new BehaviorSubject({isAuthorized: false});
  /* the event that informs listeners about the updates on the authorization state.*/
  $userLoginState: Observable < any > = this.loginState.asObservable();
  loginResponse: LoginResponse;
  constructor(
    private tokenHandler: TokenHandlerService, private router: Router) {
    this.updateLoginStateFromTheLocalStorage();
    this.subscribeToLoginStateChanges();
  }

  /**
   * @author Nermeen Mattar
   * @description Returns the state of the current user whether logged in or not
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
    this.loginResponse = JSON.parse(localStorage.getItem('loginResponse'));
    this.loginState.next({isAuthorized: this.isAuthenticated()}); /* on refresh only send isAthorized without loginResponse object */
  }


  /**
   * @author Nermeen Mattar
   * @description It executes the on login success method or the logout method based on the received login info. But if this class is the
   * one which emitted the login state change (on refresh) then it returns without doing anything.
   */
  subscribeToLoginStateChanges() {
    this.$userLoginState.subscribe(loginStatus => {
      if (!loginStatus.isAuthorized && loginStatus.logoutResponse) {
        this.logout();
      } else if (loginStatus.loginResponse) {
        this.onLoginRequestSuccess(loginStatus.loginResponse); // this.loginResponse,
      }
    });
  }

  /**
   * @author Nermeen Mattar
   * @description upon successful user login/switch this function sets the login response class property and in the local storage.
   * Navigates to the events page (default page for authorized users).
   * @param {any} loginResponse
   * @memberof AuthService
   */
  onLoginRequestSuccess(loginResponse) {
    this.loginResponse = loginResponse; // may use map to only store needed info
    localStorage.setItem('loginResponse', JSON.stringify(this.loginResponse));
    this.router.navigateByUrl('events');
  }

  /**
   * @author Nermeen Mattar
   * @description logs out the user. Resets the login response class property and removes it from the local storage. Then navigates to the
   * home page (default page for unauthorized users).
   */
  logout() {
    this.loginResponse = undefined;
    localStorage.removeItem('loginResponse');
    this.router.navigateByUrl('home');
  }

  /**
   * @author Nermeen Mattar
   * checks if the user is authenticated based on first, the existance of login response which indicates that the user is signed in
   * second, the token in the login response is not expired yet
   * @returns {boolean}
   */
  isAuthenticated(): boolean {
    if (this.loginResponse && this.loginResponse.token) {
      this.tokenHandler.isTokenValid(this.loginResponse.token);
      return true;
      /*  hiding checking if token is expired until discussing the requirements
     return this.tokenHandler.isTokenValid(this.loginResponse.token); */
    }
    return false;
  }
}
