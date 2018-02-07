import { Injectable, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { TokenHandlerService } from './token-handler.service';
import { HttpRequestsService } from '../../core/services/http-requests.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
/**
 * @author Nermeen Mattar
 * @class AuthService is responsible of user authentication and JWT tokens.
 * AuthService is the only class that uses TokenHandlerService.
 */
@Injectable()
export class AuthService implements OnDestroy {
  isLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject(false);
  $userLoggedIn: Observable<boolean> = this.isLoggedIn.asObservable();
  constructor(
    private httpRequest: HttpRequestsService,
    private tokenHandler: TokenHandlerService, private router: Router
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

  login(userCredentials) {
    this.httpRequest.httpPost('login', userCredentials).subscribe(
      res => {
        this.httpRequest.loginResponse = res; // may use map to only store needed info
        localStorage.setItem('login-response', JSON.stringify(this.httpRequest.loginResponse));
        this.addTokenToHttpHeader();
        this.router.navigateByUrl('events');
        this.isLoggedIn.next(true);
      },
      err => {
        console.log('The username or password is incorrect ')// replace this line with an error alert
      }
    );
  }

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

  getLoginResponseFromStorage() {
    return JSON.parse(localStorage.getItem('login-response'));
  }
  private addTokenToHttpHeader() {
    this.httpRequest.setHttpRequestOptions(this.httpRequest.loginResponse.token); // any subsequent request will have a token
  }

  ngOnDestroy() {
  }
}
