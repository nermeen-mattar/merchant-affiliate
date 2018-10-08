import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http/src/response';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { tap } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { LoginStatusService } from './../../auth/services/login-status.service';
import { UserMessages } from './../models/user-messages.model';
import { environment } from './../../../environments/environment';
import { UserMessagesService } from './user-messages.service';

@Injectable()
export class HttpRequestsService {
  private requestHeader: HttpHeaders;
  private requestOptions: {headers: HttpHeaders};
  private baseUrl: string;
  private token: BehaviorSubject < string > = new BehaviorSubject('');
  /* the event that informs listeners about the token updates */
  $token: Observable < string > = this.token.asObservable();
  constructor(private http: HttpClient, private userMessagesService: UserMessagesService, private loginStatusService: LoginStatusService) {
    this.baseUrl = environment.baseUrl;
    this.requestHeader = new HttpHeaders({
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    });
    this.removeTokenOnLogout();
    const token = localStorage.getItem('token');
    if(token) {
      this.appendAuthorizationToRequestHeader(token);
    }
  }

   /**
   * @author Nermeen Mattar
   * @description It listens to login state to remove the token when the user logs out so that any subsequent request will not include
   * authorization property (unauthorized user)
   */
  removeTokenOnLogout() {
    this.loginStatusService.$userLoginState.subscribe( isLoggedIn => {
      if (!isLoggedIn) {
        this.removeAuthorizationFromRequestHeader();
      }
    });
  }

  updateTokenIfNeeded(token?: string) {
    if (token) {
      localStorage.setItem('token',token);
      this.token.next(token);
      this.appendAuthorizationToRequestHeader(token);
    }
  }

  appendAuthorizationToRequestHeader(token: string) {
    this.requestHeader =  this.requestHeader.set('Authorization', `Bearer ${token}`);
    this.setHttpRequestOptions();
  }

  removeAuthorizationFromRequestHeader() {
    localStorage.removeItem('token');
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
          this.updateTokenIfNeeded(res.jwt);
          res = res.data;
          obs.next(res);
          obs.complete();
        },
        err => {
          if (err.error.statusCode === 401) {
            this.loginStatusService.logout();
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
          this.updateTokenIfNeeded(res.jwt || res.token);
          res = res.data? res.data : res;
          obs.next(res);
          obs.complete();
        },
        err => {
          if (err.error.statusCode === 401) {
            this.loginStatusService.logout();
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
        this.updateTokenIfNeeded(res.jwt);
        res = res.data;
        obs.next(res);
          obs.complete();
        },
        err => {
          if (err.error.statusCode === 401) {
            this.loginStatusService.logout();
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
        this.updateTokenIfNeeded(res.jwt);
          res = res.data;
          obs.next(res);
          obs.complete();
        },
        err => {
          this.userMessagesService.showUserMessage(userMessages, 'fail', err);
          obs.error(err);
          if (err.error.statusCode === 401) {
            this.loginStatusService.logout();
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
