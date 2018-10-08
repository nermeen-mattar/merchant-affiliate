import { Injectable } from '@angular/core';

import { HttpRequestsService } from './http-requests.service';
import { LoginStatusService } from './../../auth/services/login-status.service';
import { TeamsService } from './teams.service';
import { DecodedToken } from './../../auth/models/decoded-token.model';
import { TokenHandlerService } from '../../auth/services/token-handler.service';
@Injectable()
export class UserService {
  /* User static properties (received from the backend) */
  private _username: string;
  private _memberId: number;
  private _firstName: string;
  private _lastName: string;
  private _mobile: number;

  constructor(private teamsService: TeamsService, loginStatusService: LoginStatusService, httpRequestsService: HttpRequestsService,
    tokenHandlerService: TokenHandlerService) {
    loginStatusService.$userLoginState.subscribe(isLoggedIn => {
      if (!isLoggedIn) {
        this.resetData();
      }
    });
    httpRequestsService.$token.subscribe( token => {
      // executed 1) upon login 2) upon token change 
      this.updateLoggedInUserInfo(tokenHandlerService.decodeToken(token));
    });
  }

  /**
   * @author Nermeen Mattar
   * @description returns the username/email for the logged in user
   * @readonly
   * @type {string}
   */
  get username(): string {
    return this._username;
  }

  /**
   * @author Nermeen Mattar
   * @description sets the username/email in a private variable then it either sets it in the localstorage or remove it from the
   * localstorage
   * @param {username} string
   */
  set username(username: string) {
    this._username = username;
    if (username) {
      localStorage.setItem('username', username);
    } else {
      localStorage.removeItem('username');
    }
  }

  /**
   * @author Nermeen Mattar
   * @description returns the username/email for the logged in user
   * @readonly
   * @type {string}
   */
  get firstName(): string {
    return this._firstName;
  }

  /**
   * @author Nermeen Mattar
   * @description sets the firstName in a private variable then it either sets it in the localstorage or remove it from the
   * localstorage
   * @param {firstName} string
   */
  set firstName(firstName: string) {
    this._firstName = firstName;
    if (firstName) {
      localStorage.setItem('firstName', firstName);
    } else {
      localStorage.removeItem('firstName');
    }
  }

  /**
   * @author Nermeen Mattar
   * @description returns the username/email for the logged in user
   * @readonly
   * @type {string}
   */
  get lastName(): string {
    return this._lastName;
  }

  /**
   * @author Nermeen Mattar
   * @description sets the lastName in a private variable then it either sets it in the localstorage or remove it from the
   * localstorage
   * @param {lastName} string
   */
  set lastName(lastName: string) {
    this._lastName= lastName;
    if (lastName) {
      localStorage.setItem('lastName', lastName);
    } else {
      localStorage.removeItem('lastName');
    }
  }

  /**
   * @author Nermeen Mattar
   * @description returns the mobile for the logged in user
   * @readonly
   * @type {number}
   */
  get mobile(): number {
    return this._mobile;
  }

  /**
   * @author Nermeen Mattar
   * @description sets the mobile in a private variable then it either sets it in the localstorage or remove it from the
   * localstorage
   * @param {mobile} number
   */
  set mobile(mobile: number) {
    this._mobile= mobile;
    if (mobile) {
      localStorage.setItem('mobile', mobile.toString());
    } else {
      localStorage.removeItem('mobile');
    }
  }

  /**
   * @author Nermeen Mattar
   * @description returns the user id for the logged in user
   * @readonly
   * @type {number}
   */
  get memberId(): number {
    return this._memberId;
  }

  /**
   * @author Nermeen Mattar
   * @description sets the user id in a private variable then it either sets it in the localstorage or
   * remove it from the localstorage
   * @param {memberId} number
   */
  set memberId(memberId: number) {
    this._memberId = memberId;
    if (memberId) {
      localStorage.setItem('memberId', memberId.toString());
    } else {
      localStorage.removeItem('memberId');
    }
  }

  /**
   * @author Nermeen Mattar
   * @description sets the class properties (username, team roles, and user type ordinary/admin) either from the decoded token (immediately
   * after logging in) or from the localStorage (in case a logged in user refreshed the page)
   * @param {DecodedToken} decodedToken
   */
  updateLoggedInUserInfo(decodedToken?: DecodedToken) {
    debugger;
    if (decodedToken) {
      this.memberId = decodedToken.memberId;
      this.username = decodedToken.sub;
      this.firstName = decodedToken.firstName;
      this.lastName = decodedToken.lastName;
      this.mobile = decodedToken.mobile;
      this.teamsService.initTeamRolesAndTeamsList(decodedToken.teamRoles);
    } else {
      this.memberId = Number(localStorage.getItem('memberId'));
      this.username = localStorage.getItem('username');
      this.firstName = localStorage.getItem('firstName');
      this.lastName = localStorage.getItem('lastName');
      this.mobile = Number(localStorage.getItem('mobile'));
    }
  }

  /**
   * @author Nermeen Mattar
   * @description resets the class variables
   */
  resetData() {
    this.memberId = null;
    this.username = null;
    this.firstName = null;
    this.lastName = null;
    this.mobile = null;
    this.teamsService.resetData();
  }
}
