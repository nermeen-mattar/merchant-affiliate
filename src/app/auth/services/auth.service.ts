import { Observer } from 'rxjs/Observer';
import { Injectable, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { TokenHandlerService } from './token-handler.service';
import { HttpRequestsService } from '../../core/services/http-requests.service';
/**
 * @author Nermeen Mattar
 * @class AuthService is responsible of user authentication and JWT tokens.
 * AuthService is the only class that uses TokenHandlerService.
 */
@Injectable()
export class AuthService implements OnDestroy {
  subject: Subject < {} > ;
  constructor(
    private httprequest: HttpRequestsService,
    private tokenHandler: TokenHandlerService, private router: Router
  ) {
    this.subject = new Subject < any > ();
    this.httprequest.loginResponse = this.getLoginResponseFromStorage();
    if (this.httprequest.loginResponse) {
      /*  needed in case the app is reloaded and the user is logged in */
      this.addTokenToHttpHeader();
    }
  }
  getAuthObservable(): Observable < {} > {
    return this.subject.asObservable();
  }

  login(userCredentials) {
    this.httprequest.httpPost('login', userCredentials).subscribe(
      res => {
        this.httprequest.loginResponse = res; // may use map to only store needed info
        localStorage.setItem('login-response', JSON.stringify(this.httprequest.loginResponse));
        this.addTokenToHttpHeader();
        this.router.navigateByUrl('events');
        this.subject.next('success');
      },
      err => {
        this.subject.next('fail');
        console.log('The username or password is incorrect ')// replace this line with an error alert
      }
    );
  }

  logout() {
    this.httprequest.setHttpRequestOptions(); // any subsequent request will have a token
    localStorage.removeItem('login-response');
    this.httprequest.loginResponse = undefined;
    this.httprequest.token = undefined;
    this.router.navigateByUrl('home');
  }

  /**
   * @function isAuthenticated checks if the user is authenticated based on two conditions:
   * 1- existance of login response which indicates that the user has signed in
   * 2- the token is not expired yet
   */
  isAuthenticated(): Boolean {
    if (this.httprequest.loginResponse && this.httprequest.loginResponse.token) {
      return this.tokenHandler.isTokenValid(this.httprequest.loginResponse.token);
    }
    return false;
  }

  getLoginResponseFromStorage() {
    return JSON.parse(localStorage.getItem('login-response'));
  }
  private addTokenToHttpHeader() {
    this.httprequest.setHttpRequestOptions(this.httprequest.loginResponse.token); // any subsequent request will have a token
  }

  ngOnDestroy() {
    this.subject.complete();
  }
}
