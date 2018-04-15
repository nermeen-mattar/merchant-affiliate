import { Observable } from 'rxjs/Observable';
import { HttpRequestsService } from './http-requests.service';
import { Injectable } from '@angular/core';

@Injectable()
export class AdminService {

  constructor(private httpRequestService: HttpRequestsService) { }

  /**
   * @author Nermeen Mattar
   * @description Uses the httpRequestsSevrice to send a post request to the backend to check whether the received email belongs to an
   * already existed admin. Note that an object of type UserMessages is being sent with an empty fail property to disable defulat error.
   * @param emailObj
   */
  isAdminExist(email: string): Observable < any > {
    return this.httpRequestService.httpPost('teamadmins/check', {email: email}, {fail: 'NO_ERROR_MESSAGE'});
  }

}
