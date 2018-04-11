import { Injectable, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { first } from 'rxjs/operators';

import { LoginResponse } from './../models/login-response.model';
import { UserMessagesService } from './../../core/services/user-messages.service';
import { UserService } from './../../core/services/user.service';
import { TokenHandlerService } from './token-handler.service';
import { HttpRequestsService } from '../../core/services/http-requests.service';
import { ServerSideLoginInfo } from '../models/server-side-login-info.mdel';
import { ServerSideRegisterInfo } from '../models/server-side-register-info.model';

@Injectable()
export class AuthService implements OnDestroy {
  isLoggedIn: BehaviorSubject < boolean > = new BehaviorSubject(false);
  $userLoggedIn: Observable < boolean > = this.isLoggedIn.asObservable();
  loginResponse: LoginResponse;
  constructor(
    private httpRequestsService: HttpRequestsService,
    private tokenHandler: TokenHandlerService, private router: Router,
    private userService: UserService,
    private userMessagesService: UserMessagesService
  ) {
    this.loginResponse = JSON.parse(localStorage.getItem('loginResponse'));
    this.updateAuthorizationStates();
  }

  /**
   * @author Nermeen Mattar
   * @description sends a post request to the server holding user credentials to login an existing user.
   * @param {ServerSideLoginInfo} userCredentials
   */
  login(userCredentials: ServerSideLoginInfo) {
    this.httpRequestsService.httpPost('login', userCredentials, {
        fail: 'INCORRECT_USERNAME_OR_PASSWORD'
      })
      .subscribe(
        res => {
          this.onLoginRequestSuccess(res);
        }
      );
  }

  /**
   * @author Nermeen Mattar
   * @description sends a post request to the server holding admin credentials to switch from member view to admin vie
   * @param {ServerSideLoginInfo} userCredentials
   */
  switchToAdmin(userCredentials: ServerSideLoginInfo) {
    const switchFailMsg = 'INCORRECT_ADMIN_PASSWRD';
    this.httpRequestsService.httpPost('login', userCredentials, {
        fail: switchFailMsg
      })
      .subscribe(
        res => {
          if (res.isAuthorized.toLowerCase() === 'admin') {
            this.onLoginRequestSuccess(res);
          } else {
            this.userMessagesService.showUserMessage({
              fail: switchFailMsg
            }, 'fail');
          }
        }
      );
  }

  /**
   * @description upon successful user login/switch it sets the login response class property and in the local storage, then it updates all
   * the authorization states and finally, navigates to the events page (default page for authorized users).
   * @param {any} loginResponse
   * @memberof AuthService
   */
  onLoginRequestSuccess(loginResponse) {
    this.loginResponse = loginResponse; // may use map to only store needed info
    localStorage.setItem('loginResponse', JSON.stringify(this.loginResponse));
    this.updateAuthorizationStates();
    this.router.navigateByUrl('events');
  }

  /**
   * @author Nermeen Mattar
   * @description logs out the user by reseting the login response class property and removing it from the local storage then updating all
   * the authorization states and finally, navigating to the home page (default page for unauthorized users).
   */
  logout() {
    this.loginResponse = undefined;
    localStorage.removeItem('loginResponse');
    this.updateAuthorizationStates();
    this.router.navigateByUrl('home');
  }

  /**
   * @author Nermeen Mattar
   * @description The function is the centralized place that updates the authorization states based on the value of the login response.
   * First, it it changes the request options in the http service so that any subsequent request will either include authorization property
   * (if user authorized) or not (if user unauthorized). Second, it either calls seting/resetign user info in the user service. Finally, it
   * emits an event to inform listenting components about the updated authorization state.
   */
  updateAuthorizationStates() {
    if (this.loginResponse) {
      this.httpRequestsService.appendAuthorizationToRequestHeader(this.loginResponse.token);
      this.userService.setLoggedInUserInfo(this.tokenHandler.decodeToken(this.loginResponse.token)); // this.loginResponse,
      this.isLoggedIn.next(true);
    } else {
      this.httpRequestsService.deleteAuthorizationInRequestHeader();
      this.userService.clearLoggedInUserInfo();
      this.isLoggedIn.next(false);
    }
  }

  /**
   * @description sends a post request holding user entered info to the server to register a new user
   * @param {ServerSideRegisterInfo} registrationInfo
   * @returns {Observable<any>}
   */
  register(registrationInfo: ServerSideRegisterInfo): Observable < any > {
    return this.httpRequestsService.httpPost('register', registrationInfo);
  }

  /**
   * @author Nermeen Mattar
   * checks if the user is authenticated based on first, the existance of login response which indicates that the user is signed in
   * second, the token in the login response is not expired yet
   * @returns {boolean}
   */
  isAuthenticated(): boolean {
    if (this.loginResponse && this.loginResponse.token) {
      return this.tokenHandler.isTokenValid(this.loginResponse.token);
    }
    return false;
  }

  ngOnDestroy() {}
}
