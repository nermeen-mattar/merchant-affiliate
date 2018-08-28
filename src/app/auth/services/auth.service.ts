import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';

import { LoginStatusService } from './login-status.service';
import { HttpRequestsService } from '../../core/services/http-requests.service';
import { ServerSideLoginInfo } from '../models/server-side-login-info.mdel';
import { ServerSideRegisterInfo } from '../models/server-side-register-info.model';
@Injectable()
export class AuthService {
  constructor(
    private httpRequestsService: HttpRequestsService,
    private loginStatusService: LoginStatusService
  ) {}

  /**
   * @description sends a post request holding user entered info to the server to register a new user
   * @param {ServerSideRegisterInfo} registrationInfo
   */
  register(registrationInfo: ServerSideRegisterInfo): Observable < any > {
    return this.httpRequestsService.httpPost('register', registrationInfo, {
      fail: 'REGISTER.UNABLE_TO_REGISTER'
    });
  }

  /**
   * @author Nermeen Mattar
   * @description sends a post request to the server holding user credentials to login an existing user.
   * @param {ServerSideLoginInfo} userCredentials
   */
  login(userCredentials: ServerSideLoginInfo): Observable < any > {
    return this.httpRequestsService.httpPost('login', userCredentials, {
        failDefault: 'LOGIN.INCORRECT_USERNAME_OR_PASSWORD'
      })
      .pipe(map(
        res => {
          if (!res.message) { // this if statement is temp until the backend fixes the case of email not confirmed by returning an error
            this.loginStatusService.loginState.next({isAuthorized: true, loginResponse: res});
          }
          return res;
        }));
  }
  /**
   * @author Nermeen Mattar
   * @description requests a reset password mail for passed email.
   * @param {string} email
   */
  requestResetPassword(email: string): Observable < any > {
    return this.httpRequestsService.httpPost('request_reset_password', email,{
      fail: 'RESET_PASSWORD.EMAIL_NOT_EXIST'
    } );
  }
  /**
   * @author Nermeen Mattar
   * @description sends a post request to the server to reset the password for the passed email.
   * @param {string} newPassword
   * @param {string } hash
   */
  resetPassword(newPassword: string, hash: string): Observable < any > {
    return this.httpRequestsService.httpPost('reset_password', {newPassword: newPassword, 
    hash: hash});
  }
}
