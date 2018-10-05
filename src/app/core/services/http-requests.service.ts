import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http/src/response';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

import { LoginStatusService } from './../../auth/services/login-status.service';
import { UserMessages } from './../models/user-messages.model';
import { environment } from './../../../environments/environment';
import { UserMessagesService } from './user-messages.service';
import { tap } from 'rxjs/operators';
import { LoginStatus } from '../models/login-status.model';

@Injectable()
export class HttpRequestsService {
  private requestHeader: HttpHeaders;
  private requestOptions: {headers: HttpHeaders};
  private baseUrl: string;

  constructor(private http: HttpClient, private userMessagesService: UserMessagesService, private loginStatusService: LoginStatusService) {
    this.baseUrl = environment.baseUrl;
    this.requestHeader = new HttpHeaders({
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    });
    this.loginStatusService.$userLoginState.subscribe( (loginStatus: LoginStatus) => {
      this.changeRequestHeaderAuthorization(loginStatus);
    });
  }

   /**
   * @author Nermeen Mattar
   * @description It changes the request options in the http service so that any subsequent request will either include authorization
   * property (authorized user) or not (unauthorized user) based on the value of the login response.
   * @param {LoginStatus} [loginStatus]
   */
  changeRequestHeaderAuthorization(loginStatus?: LoginStatus) {
    if (!loginStatus.isAuthorized && loginStatus.logoutResponse) {
      this.removeAuthorizationFromRequestHeader();
    } else {
      const loginResponse =  JSON.parse(localStorage.getItem('loginResponse'));
      this.appendAuthorizationToRequestHeader(loginResponse && loginResponse.token);
      }
  }

  appendAuthorizationToRequestHeader(token: string) {
    if (token) {
      this.requestHeader =  this.requestHeader.set('Authorization', `Bearer ${token}`);
      this.setHttpRequestOptions();
    }
  }

  removeAuthorizationFromRequestHeader() {
    this.requestHeader =  this.requestHeader.delete('Authorization');
    this.setHttpRequestOptions();
  }

  setHttpRequestOptions() {
    this.requestOptions = {
      headers: this.requestHeader
    };
  }

  public httpGet(requestUrl: string, userMessages ?: UserMessages): Observable < any > {
    return Observable.create(obs => {
      this.http.get(this.baseUrl + requestUrl, this.requestOptions).subscribe((res: any) => {
          this.userMessagesService.showUserMessage(userMessages, 'success');
          this.appendAuthorizationToRequestHeader(res.token);
          res = res.data;
          obs.next(res);
          obs.complete();
        },
        err => {
          if (err.error.statusCode === 401) {
            this.loginStatusService.loginState.next({isAuthorized: false, logoutResponse: true});
          }
          this.userMessagesService.showUserMessage(userMessages, 'fail', err);
          obs.error(err);
        });
    });
  }

  public httpPost(requestUrl: string, requestParams ?: Object, userMessages ?: UserMessages): Observable < any > {
    return Observable.create(obs => {
      this.http.post(this.baseUrl + requestUrl, requestParams, this.requestOptions).subscribe((res: any) => {
          this.userMessagesService.showUserMessage(userMessages, 'success');
          this.appendAuthorizationToRequestHeader(res.token);
          res = res.data? res.data : res;
          obs.next(res);
          obs.complete();
        },
        err => {
          if (err.error.statusCode === 401) {
            this.loginStatusService.loginState.next({isAuthorized: false, logoutResponse: true});
          }
          this.userMessagesService.showUserMessage(userMessages, 'fail', err);
          obs.error(err);
        });
    });
  }

  public httpPut(requestUrl: string, requestParams ?: Object, userMessages?: UserMessages): Observable < any > {
    return Observable.create(obs => {
      this.http.put(this.baseUrl + requestUrl, requestParams, this.requestOptions).subscribe((res: any) => {
        this.userMessagesService.showUserMessage(userMessages, 'success');
        this.appendAuthorizationToRequestHeader(res.token);
        res = res.data;
        obs.next(res);
          obs.complete();
        },
        err => {
          if (err.error.statusCode === 401) {
            this.loginStatusService.loginState.next({isAuthorized: false, logoutResponse: true});
          }
          this.userMessagesService.showUserMessage(userMessages, 'fail', err);
          obs.error(err);
        });
    });
  }

  public httpDelete(requestUrl: string, userMessages?: UserMessages): Observable < any > {
    return Observable.create(obs => {
      this.http.delete(this.baseUrl + requestUrl, this.requestOptions).subscribe((res: any) => {
        this.userMessagesService.showUserMessage(userMessages, 'success');
        this.appendAuthorizationToRequestHeader(res.token);
          res = res.data;
          obs.next(res);
          obs.complete();
        },
        err => {
          this.userMessagesService.showUserMessage(userMessages, 'fail', err);
          obs.error(err);
          if (err.error.statusCode === 401) {
            this.loginStatusService.loginState.next({isAuthorized: false, logoutResponse: true});
          }
        });
    });
  }

  /*
  // To be uncommented to check with Ahsan why handle error is never called eventhough I am forcing the request to return error by appending
  // the word fail to the base url
  public httpPost(requestUrl: string, requestParams ? : Object, userMessages ?: UserMessages): Observable < any > {
      return this.http.post(this.baseUrl + 'fail' + requestUrl, requestParams, this.requestOptions).pipe(
        map(res => {
          this.userMessagesService.showUserMessage(userMessages, 'success');
        },
        catchError (err => this.handleError(err, userMessages))
      ));
  }
  */

  private handleError(error: HttpErrorResponse, userMessages: UserMessages) {
    this.userMessagesService.showUserMessage(userMessages, 'fail');
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('A client-side/network error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an ErrorObservable with a user-facing error message
    return new ErrorObservable<string>().pipe(tap(() => 'Something bad happened; please try again later.'));
  }
}
