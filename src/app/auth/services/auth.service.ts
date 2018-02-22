import { Injectable, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { first } from 'rxjs/operators';

import { UserService } from './../../core/services/user.service';
import { TokenHandlerService } from './token-handler.service';
import { HttpRequestsService } from '../../core/services/http-requests.service';
import { ServerSideLoginInfo } from '../models/server-side-login-info.mdel';
import { ServerSideRegisterInfo } from '../models/server-side-register-info.model';

@Injectable()
export class AuthService implements OnDestroy {
  isLoggedIn: BehaviorSubject < boolean > = new BehaviorSubject(false);
  $userLoggedIn: Observable < boolean > = this.isLoggedIn.asObservable();
  constructor(
    private httpRequest: HttpRequestsService,
    private tokenHandler: TokenHandlerService, private router: Router,
    private userService: UserService
  ) {
    this.httpRequest.loginResponse = this.getLoginResponseFromStorage();
    if (this.httpRequest.loginResponse) {
      /*  needed in case the page is reloaded and the user is logged in */
      this.addTokenToHttpHeader();
      this.isLoggedIn.next(true);
    } else {
      this.isLoggedIn.next(false);
    }
  }

  /**
   * @author Nermeen Mattar
   * @description sends a post request to the server holding user credentials to login an existing user.
   * @param {ServerSideLoginInfo} userCredentials
   */
  login(userCredentials: ServerSideLoginInfo) {
    this.httpRequest.httpPost('login', userCredentials)
      .pipe(
        first()
      )
      .subscribe(
        res => {
          this.httpRequest.loginResponse = res; // may use map to only store needed info
          localStorage.setItem('login-response', JSON.stringify(this.httpRequest.loginResponse));
          this.addTokenToHttpHeader();
          this.router.navigateByUrl('events');
          this.isLoggedIn.next(true);
          this.storeLoggedInUserInfo(this.tokenHandler.decodeToken(this.httpRequest.loginResponse.token));
        },
        err => {
          console.log('The username or password is incorrect '); // replace this line with an error alert
        }
      );
  }

  /**
   * @author Nermeen Mattar
   * @description logs out the user by firstly changing request header to not include authentication token, secondly removing the login
   * response object (received upon logging in) from local storage, third resting the local variables (login response and token),
   * and finally navigating to home.
   */
  logout() {
    this.httpRequest.setHttpRequestOptions(); // any subsequent request will have a token
    localStorage.removeItem('login-response');
    this.httpRequest.loginResponse = undefined;
    this.httpRequest.token = undefined;
    this.router.navigateByUrl('home');
    this.isLoggedIn.next(false);
  }
  /**
   * @description sends a post request holding user entered info to the server to register a new user
   * @param {ServerSideRegisterInfo} registrationInfo
   * @returns {Observable<any>}
   */
  register(registrationInfo: ServerSideRegisterInfo): Observable < any > {
    return this.httpRequest.httpPost('register', registrationInfo);
  }

  /**
   * @author Nermeen Mattar
   * checks if the user is authenticated based on first, the existance of login response which indicates that the user is signed in
   * second, the token in the login response is not expired yet
   * @returns {boolean}
   */
  isAuthenticated(): boolean {
    if (this.httpRequest.loginResponse && this.httpRequest.loginResponse.token) {
      return this.tokenHandler.isTokenValid(this.httpRequest.loginResponse.token);
    }
    return false;
  }

  /**
   * @author Nermeen Mattar
   * @description retrieves the login response object from the local storage
   */
  getLoginResponseFromStorage() {
    return JSON.parse(localStorage.getItem('login-response'));
  }
  /**
   * @author Nermeen Mattar
   * @description uses the http request service to change the request options so that any subsequent request will include a token
   */
  private addTokenToHttpHeader() {
    this.httpRequest.setHttpRequestOptions(this.httpRequest.loginResponse.token);
  }

  /**
   *
   * @author Nermeen Mattar
   * @description is responsible for storing logged in user data
   * @param {{sub: string, teamRoles: any[]}} userInfo
   * @ToDo:
   *  1-  add real/descriptive type for userInfo
   *  2- add service for using local storage to handle the JSON.stringify/JSON.parse
   */
  storeLoggedInUserInfo(userInfo) { // : {sub: string, teamRoles: any[]})
    this.userService.setUsername(userInfo.sub);
    this.userService.setTeamRoles(userInfo.teamRoles);
  }

  ngOnDestroy() {}
}
