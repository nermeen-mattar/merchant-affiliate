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
import { UserMessagesService } from './user-messages.service';

@Injectable()
export class HttpRequestsService {
  private requestHeader: Headers;
  private requestOptions: Object;
  private baseUrl: string;
  public token: string;

  constructor(private http: HttpClient, private router: Router, private userMessagesService: UserMessagesService) {
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

  public httpGet(requestUrl: string, userMessages ?: UserMessages): Observable < any > {
    return Observable.create(obs => {
      this.http.get(this.baseUrl + requestUrl, this.requestOptions).subscribe(res => {
          this.userMessagesService.showUserMessage(userMessages, 'success');
          obs.next(res);
        },
        err => {
          this.userMessagesService.showUserMessage(userMessages, 'fail');
        });
    });
  }

  public httpPost(requestUrl: string, requestParams ? : Object, userMessages ?: UserMessages): Observable < any > {
    return Observable.create(obs => {
      this.http.post(this.baseUrl + requestUrl, requestParams, this.requestOptions).subscribe(res => {
          this.userMessagesService.showUserMessage(userMessages, 'success');
          obs.next(res);
        },
        err => {
          this.userMessagesService.showUserMessage(userMessages, 'fail');
        });
    });
  }

  public httpPut(requestUrl: string, requestParams ? : Object, userMessages?: UserMessages): Observable < any > {
    return Observable.create(obs => {
      this.http.put(this.baseUrl + requestUrl, requestParams, this.requestOptions).subscribe(res => {
          obs.next(res);
          this.userMessagesService.showUserMessage(userMessages, 'success');
        },
        err => {
          this.userMessagesService.showUserMessage(userMessages, 'fail');
        });
    });
  }

  public httpDelete(requestUrl: string, userMessages?: UserMessages): Observable < any > {
    return Observable.create(obs => {
      this.http.delete(this.baseUrl + requestUrl, this.requestOptions).subscribe(res => {
          obs.next(res);
          this.userMessagesService.showUserMessage(userMessages, 'success');
        },
        err => {

          this.userMessagesService.showUserMessage(userMessages, 'fail');
        });
    });
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
