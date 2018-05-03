import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { HttpRequestsService } from '../../core/services/http-requests.service';

@Injectable()
export class RegisterService {

  constructor( private httpRequestsService: HttpRequestsService) { }

  /**
   * @author Nermeen Mattar
   * @description attempts to resend activation mail
   * @param {string} email
   */
  resendActivationMail(email: string): Observable <any> {
    return this.httpRequestsService.httpPost('activation/resent', {email: email},
    { success: 'REGISTER.ACTIVATION_MAIL_RESEND__SUCCESS'}); // {fail: 'NO_ERROR_MESSAGE'}
  }

}
