import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { baseUrl } from './../../../environments/environment';
import { Observer } from 'rxjs/Observer';
import { Router } from '@angular/router';
import { Response, RequestOptions, Headers } from '@angular/http';
import { HttpErrorResponse } from '@angular/common/http/src/response';
import 'rxjs/add/operator/map';

@Injectable()
export class HttpRequestsService {
  private requestHeader: Headers;
  private requestOptions: Object;
  private baseUrl: string;
  public token: string;
  public loginResponse;
  constructor(private http: HttpClient, private router: Router) {
    this.setHttpRequestOptions();
    this.baseUrl = baseUrl;
    this.loginResponse = JSON.parse(localStorage.getItem('login-response'));
    if (this.loginResponse) {
      this.token = this.loginResponse.token;
    }
  }

  setHttpRequestOptions(token ? : string) {
    if (token) {
      this.token = token;
      this.requestHeader = new Headers({ // HttpHeaders
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
    return this.http.get(this.baseUrl + requestUrl, this.requestOptions)
      .map(response => response)
    // .catch(this.handleError.bind(this));
  }

  public httpPost(requestUrl: string, requestParams ? : Object): Observable < any > {
    return this.http.post(this.baseUrl + requestUrl, requestParams, this.requestOptions)
      .map(response => response)
    // .catch(this.handleError.bind(this));
  }

  public httpPut(requestUrl: string, requestParams ? : Object): Observable < any > {
    return this.http.put(this.baseUrl + requestUrl, requestParams, this.requestOptions)
      .map(response => response)
    // .catch(this.handleError.bind(this));
  }

  public httpDelete(requestUrl: string): Observable < any > {
    return this.http.delete(this.baseUrl + requestUrl, this.requestOptions)
      .map(response => response)
    //.catch(this.handleError.bind(this));
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
