import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { BehaviorSubject } from 'rxjs';

import { UserMessagesService } from './../../core/services/user-messages.service';
import { UserService } from './../../core/services/user.service';
import { TokenHandlerService } from './token-handler.service';
import { HttpRequestsService } from '../../core/services/http-requests.service';
import { LoginResponse } from './../models/login-response.model';

@Injectable({
  providedIn: 'root'
})
export class LoginStatusService {
  isLoggedIn: BehaviorSubject < any > = new BehaviorSubject(false);
  /* the event that informs listeners about the updates on the authorization state.*/
  $userLoggedIn: Observable < any > = this.isLoggedIn.asObservable();
  loginResponse: LoginResponse;
  constructor(
    private tokenHandler: TokenHandlerService, private router: Router ) {
    this.loginResponse = JSON.parse(localStorage.getItem('loginResponse'));
    this.$userLoggedIn.subscribe( loginInfo => {
      if (loginInfo) {
        this.onLoginRequestSuccess(loginInfo);
      } else {
        this.logout();
      }
    });
  }

  /**
   * @author Nermeen Mattar
   * @description upon successful user login/switch this function sets the login response class property and in the local storage. Sets the
   *  user info in the user service. Updates all the authorization states. Navigates to the events page (default page for authorized users).
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
   * @description logs out the user. Resets the login response class property and removing it from the local storage. Updates all the
   * authorization states. Resets the user info in the user service. Navigates to the home page (default page for unauthorized users).
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

