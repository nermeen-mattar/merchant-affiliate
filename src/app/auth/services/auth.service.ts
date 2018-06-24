import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';

import { roles } from './../../core/constants/roles.constants';
import { LoginStatusService } from './login-status.service';
import { UserMessagesService } from './../../core/services/user-messages.service';
import { HttpRequestsService } from '../../core/services/http-requests.service';
import { ServerSideLoginInfo } from '../models/server-side-login-info.mdel';
import { ServerSideRegisterInfo } from '../models/server-side-register-info.model';
@Injectable()
export class AuthService {
  constructor(
    private httpRequestsService: HttpRequestsService,
    private userMessagesService: UserMessagesService,
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
   * @description a team login function using the email and the teamirect link
   * @param {string} directLink
   * @param {string} email
   * @returns {Observable <any>}
   */
  loginUsingDirectLink(directLink: string, email: string): Observable < any > {
    return this.httpRequestsService.httpPost('login/directlink', {
        directlink: directLink,
        email: email
      }, {
        failDefault: 'LOGIN.INCORRECT_USERNAME_OR_DIRECT_LINK'
      })
      .pipe(map(
        res => {
          if (!res.message) { // this if statement is temp until the backend fixes the case of email not confirmed by returning an error
            /* this.logout(); commented on 18 June as not needed */
            this.loginStatusService.loginState.next({isAuthorized: true, loginResponse: res});
          }
          return res;
        }));
  }

  /**
   * @author Nermeen Mattar
   * @description sends a post request to the server holding admin credentials to switch from the member view to the admin view, the backend
   * will either respond with an error in case the password is wrong. Or respond with a result if the password is either a member or an
   * admin password
   * @param {ServerSideLoginInfo} userCredentials
   */
  switchToAdmin(userCredentials: ServerSideLoginInfo): Observable < any > {
    const switchFailMsg = 'LOGIN.INCORRECT_ADMIN_PASSWRD';
    return this.httpRequestsService.httpPost('login', userCredentials, {
        failDefault: switchFailMsg
      })
      .pipe(map(
        res => {
          if (res.isAuthorized.toLowerCase() === roles.admin) {
            this.loginStatusService.loginState.next({isAuthorized: true, loginResponse: res});
          } else {
            this.userMessagesService.showUserMessage({
              fail: switchFailMsg
            }, 'fail');
          }
          return res;
        }
      ));
  }
}
