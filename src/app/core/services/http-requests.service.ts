import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Response, RequestOptions, Headers } from '@angular/http';
import { HttpErrorResponse } from '@angular/common/http/src/response';
import { TranslateService } from '@ngx-translate/core';
import { MatSnackBar } from '@angular/material';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';

import { UserMessages } from './../models/user-messages.model';
import { environment } from './../../../environments/environment';
import { UserMessagesService } from './user-messages.service';
import { tap } from 'rxjs/operators';

@Injectable()
export class HttpRequestsService {
  private requestHeader: HttpHeaders;
  private requestOptions: {headers: HttpHeaders};
  private baseUrl: string;

  constructor(private http: HttpClient, private router: Router, private userMessagesService: UserMessagesService) {
    this.baseUrl = environment.baseUrl;
    this.requestHeader = new HttpHeaders({
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    });
    // this.setHttpRequestOptions();
  }

  appendAuthorizationToRequestHeader(token) {
    this.requestHeader =  this.requestHeader.append('Authorization', `Bearer ${token}`);
    this.setHttpRequestOptions();
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
          res = res.data;
          obs.next(res);
          obs.complete();
        },
        err => {
          this.userMessagesService.showUserMessage(userMessages, 'fail', err);
          obs.error(err);
        });
    });
  }

  public httpPost(requestUrl: string, requestParams ?: Object, userMessages ?: UserMessages): Observable < any > {
    return Observable.create(obs => {
      this.http.post(this.baseUrl + requestUrl, requestParams, this.requestOptions).subscribe((res: any) => {
          this.userMessagesService.showUserMessage(userMessages, 'success');
          res = res.data? res.data : res;
          obs.next(res);
          obs.complete();
        },
        err => {
          this.userMessagesService.showUserMessage(userMessages, 'fail', err);
          obs.error(err);
        });
    });
  }

  public httpPut(requestUrl: string, requestParams ?: Object, userMessages?: UserMessages): Observable < any > {
    return Observable.create(obs => {
      this.http.put(this.baseUrl + requestUrl, requestParams, this.requestOptions).subscribe((res: any) => {
          res = res.data;
          obs.next(res);
          this.userMessagesService.showUserMessage(userMessages, 'success');
          obs.complete();
        },
        err => {
          this.userMessagesService.showUserMessage(userMessages, 'fail', err);
          obs.error(err);
        });
    });
  }

  public httpDelete(requestUrl: string, userMessages?: UserMessages): Observable < any > {
    return Observable.create(obs => {
      this.http.delete(this.baseUrl + requestUrl, this.requestOptions).subscribe((res: any) => {
          res = res.data;
          obs.next(res);
          this.userMessagesService.showUserMessage(userMessages, 'success');
          obs.complete();
        },
        err => {
          this.userMessagesService.showUserMessage(userMessages, 'fail', err);
          obs.error(err);
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
