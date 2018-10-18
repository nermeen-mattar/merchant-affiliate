import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

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

  sendMemberInvitation() {
    // https://dev.team.center/invitation?h=BnbWFpbC5jb207NDU2OzI3NQ==dGVhbS0jQlYGVyMze30isLjtoYXNoEZ1IXY0RXYt5WZl1mcl52OwIDN

  }

}