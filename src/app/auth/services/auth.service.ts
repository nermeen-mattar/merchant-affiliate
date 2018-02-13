import { UserService } from './../../core/services/user.service';
import { Injectable, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { first } from 'rxjs/operators';
import { TokenHandlerService } from './token-handler.service';
import { HttpRequestsService } from '../../core/services/http-requests.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

// TODO[nermeen]: Have third party imports, then a line gap, then others. see below

// import { Injectable, OnDestroy } from '@angular/core';
// import { Router } from '@angular/router';
// import { Observable } from 'rxjs/Observable';
// import { BehaviorSubject } from 'rxjs/BehaviorSubject;'

// import { UserService } from './../../core/services/user.service';
// import { TokenHandlerService } from './token-handler.service';
// import { HttpRequestsService } from '../../core/services/http-requests.service';

/**
 * @author Nermeen Mattar
 * @class AuthService is responsible of user authentication and JWT tokens.
 * AuthService is the only class that uses TokenHandlerService.
 */
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
      /*  needed in case the app is reloaded and the user is logged in */
      this.addTokenToHttpHeader();
      this.isLoggedIn.next(true);
    } else {
      this.isLoggedIn.next(false);
    }
  }

  // TODO[nermeen]: add method level comment
  login(userCredentials) {
    // TODO[nermeen]: Use the `first` operator to make sure the subscription ends. I'm doing it for this call, replicate for other calls
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

  // TODO[nermeen]: Add a method level comment
  logout() {
    this.httpRequest.setHttpRequestOptions(); // any subsequent request will have a token
    localStorage.removeItem('login-response');
    this.httpRequest.loginResponse = undefined;
    this.httpRequest.token = undefined;
    this.router.navigateByUrl('home');
    this.isLoggedIn.next(false);
  }

  /**
   * @function isAuthenticated checks if the user is authenticated based on two conditions:
   * 1- existance of login response which indicates that the user has signed in
   * 2- the token is not expired yet
   */
  isAuthenticated(): boolean {
    if (this.httpRequest.loginResponse && this.httpRequest.loginResponse.token) {
      return this.tokenHandler.isTokenValid(this.httpRequest.loginResponse.token);
    }
    return false;
  }

  // TODO[nermeen]: add method level comment
  getLoginResponseFromStorage() {
    return JSON.parse(localStorage.getItem('login-response'));
  }

  // TODO[nermeen]: add method level comment
  private addTokenToHttpHeader() {
    this.httpRequest.setHttpRequestOptions(this.httpRequest.loginResponse.token); // any subsequent request will have a token
  }

  /**
   * @function storeLoggedInUserInfo
   * @description is responsible for storing logged in user data
   * @param {{sub: string, teamRoles: any[]}} userInfo
   * @memberof AuthService
   * @ToDo:
   *  1-  add real/descriptive type for userInfo
   *  2- add service for using local storage to handle the JSON.stringify/JSON.parse
   */
  storeLoggedInUserInfo(userInfo) { // : {sub: string, teamRoles: any[]})
    // TODO[nermeen]: QUESTION: why aren't we storing the whole userInfo?
    this.userService.setUsername(userInfo.sub);
    this.userService.setTeamRoles(userInfo.teamRoles);
  }

  ngOnDestroy() {}
}
