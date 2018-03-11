import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Response, RequestOptions, Headers } from '@angular/http';
import { HttpErrorResponse } from '@angular/common/http/src/response';
import { TranslateService } from '@ngx-translate/core';
import { MatSnackBar } from '@angular/material';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { UserMessages } from './../models/user-messages.model';
import { environment } from './../../../environments/environment';

@Injectable()
export class HttpRequestsService {
  private requestHeader: Headers;
  private requestOptions: Object;
  private baseUrl: string;
  public token: string;

  constructor(private http: HttpClient, private router: Router, public snackBar: MatSnackBar, private translateService: TranslateService) {
    this.setHttpRequestOptions();
    this.baseUrl = environment.baseUrl;
    this.token = localStorage.getItem('token');
  }

  setHttpRequestOptions(token ? : string) {
    if (token) {
      this.token = token;
      this.requestHeader = new Headers({
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + token
      });
    } else {
      this.requestHeader = new Headers({
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      });
    }
    this.requestOptions = new Object({
      headers: this.requestHeader
    });
  }

  public httpGet(requestUrl: string): Observable < any > {
    return this.http.get(this.baseUrl + requestUrl, this.requestOptions);
  }

  public httpPost(requestUrl: string, requestParams ? : Object, userMessages ?: UserMessages): Observable < any > {
    return Observable.create(obs => {
      this.http.post(this.baseUrl + requestUrl, requestParams, this.requestOptions).subscribe(res => {
          this.showUserMessage(userMessages, 'success');
          obs.next(res);
        },
        err => {
          userMessages = userMessages && userMessages.fail ? userMessages : {fail: 'Something went wrong'};
          this.showUserMessage(userMessages, 'fail');
        });
    });
  }

  public httpPut(requestUrl: string, requestParams ? : Object, userMessages?: UserMessages): Observable < any > {
    return Observable.create(obs => {
      this.http.put(this.baseUrl + requestUrl, requestParams, this.requestOptions).subscribe(res => {
          obs.next(res);
          this.showUserMessage(userMessages, 'success');
        },
        err => {
          userMessages = userMessages && userMessages.fail ? userMessages : {fail: 'Something went wrong'};
          this.showUserMessage(userMessages, 'fail');
        });
    });
  }

  public httpDelete(requestUrl: string, userMessages?: UserMessages): Observable < any > {
    return Observable.create(obs => {
      this.http.delete(this.baseUrl + requestUrl, this.requestOptions).subscribe(res => {
          obs.next(res);
          this.showUserMessage(userMessages, 'success');
        },
        err => {
          userMessages = userMessages && userMessages.fail ? userMessages : {fail: 'Something went wrong'};
          this.showUserMessage(userMessages, 'fail');
        });
    });
  }

  private showUserMessage(userMessages: UserMessages, messageType) {
    if (userMessages && userMessages[messageType]) {
      this.translateService.get('USER_MESSAGES.'.concat(userMessages[messageType])).subscribe(
        translatedMessage => {
          this.snackBar.open(translatedMessage, '', {
            duration: 1000,
            panelClass: messageType === 'success' ? 'bg-success' : 'bg-error'
          });
        }
      );
    }
  }

  private handleError(error: Response | any) {
    console.log('Http-Request Error: ', error.status + ' - ' + error.statusText);
    switch (error.status) {
      case 500:
        break;
      case 401:
        this.router.navigate(['']);
        break;
    }
    return Observable.throw(error);
  }

}
