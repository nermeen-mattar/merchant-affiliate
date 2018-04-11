import { Observable } from 'rxjs/Observable';
import { HttpRequestsService } from './http-requests.service';
import { Injectable } from '@angular/core';

@Injectable()
export class AdminService {

  constructor(private httpRequestService: HttpRequestsService) { }


  // add desc - try to find better name for function - try to find better place for func -> maybe create admin service
  /**
   * @author Nermeen Mattar
   * @description checks whether the received email belongs to an admin. There are three cases for the response; first, the email might
   * not belong to any user. Second, the email might belong to a user who is not an admin. Third, the email might belong to an admin user.
   * @param emailObj
   */
  isAdminExist(email: string): Observable < any > {
    return this.httpRequestService.httpPost('teamadmins/check', {email: email});
  }

}
