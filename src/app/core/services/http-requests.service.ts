import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { baseUrl } from './../../../environments/environment';
import { Observer } from 'rxjs/Observer';
import { Router } from '@angular/router';
import { Response, RequestOptions, Headers } from '@angular/http';
import { HttpErrorResponse } from '@angular/common/http/src/response';

@Injectable()
export class HttpRequestsService {
  private requestHeader: Headers;
  private requestOptions: Object;
  private baseUrl: string;
  public token: string;
  public loginResponse;
  constructor(private http: HttpClient) {
    // tslint:disable-next-line:max-line-length
    this.setHttpRequestOptions();
    this.baseUrl = baseUrl;
    this.loginResponse = JSON.parse(localStorage.getItem('login-response'));
    if (this.loginResponse) {
      this.token = this.loginResponse.token;
    }
  }

  setHttpRequestOptions(token?: string) {
    if (token) {
      this.token = token;
      this.requestHeader = new Headers({ // HttpHeaders
        'Accept': 'application/json',
        'Authorization': 'POS ' + token
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
    // return Observable.ceate(obs => {
  return this.http.get(this.baseUrl + requestUrl, this.requestOptions);
    //     .map(response => response)
    //     .catch(this.handleError.bind(this)).subscribe(getResponse => {
    //       obs.next(getResponse);
    //       obs.complete();
    //     }, (err: HttpErrorResponse) => {
    //       obs.error(err);
    //       obs.complete();
    //     });
    // });

  }

  public httpPost(requestUrl: string, data): Observable < any > {
    // return Observable.create((obs: Observer < any > ) => {
    return this.http.post(this.baseUrl + requestUrl, data, this.requestOptions);
    //     .map(response => {
    //       return response;
    //     })
    //     .catch((res1: HttpErrorResponse) => {
    //       return Observable.throw(res1);
    //     })
    //     .subscribe(response => {
    //       obs.next(response);
    //       obs.complete();
    //     }, (err: HttpErrorResponse) => {
    //       obs.error(err);
    //       obs.complete();
    //     });
    // });
  }

  private handleError(error: Response | any): Observable < any > {
    console.log('error', error);
    if (error && error.optionalParams && error.optionalParams.msg) {
      // .showConfir mDialog(error.optionalParams.entityName);
    }
    console.log('Http-Request Error: ', error.status + ' - ' + error.statusText);
    switch (error.status) {
      case 500:
        break;
    }
    return Observable.throw(error);
  }

}
