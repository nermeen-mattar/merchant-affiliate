import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

export class HttpRequestsServiceMock {
  private requestHeader: Headers;
  private requestOptions: Object;
  private baseUrl: string;
  public token: string;
  public loginResponse;
  constructor() {
  }

  setHttpRequestOptions(token ?: string) {}

  public httpGet(requestUrl: string): Observable < any > {
    return of({});
  }

  public httpPost(requestUrl: string, requestParams ?: Object): Observable < any > {
    return of({});
  }

  public httpPut(requestUrl: string, requestParams ?: Object): Observable < any > {
    return of({});
  }

  public httpDelete(requestUrl: string): Observable < any > {
    return of({});
  }

  private handleError(error: Response | any) {
  }

  public deleteAuthorizationInRequestHeader() {
  }

}
