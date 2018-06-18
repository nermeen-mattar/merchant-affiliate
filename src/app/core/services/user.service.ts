import { Injectable } from '@angular/core';

import { LoginStatusService } from './../../auth/services/login-status.service';
import { TeamsService } from './teams.service';
import { DecodedToken } from './../../auth/models/decoded-token.model';
import { TokenHandlerService } from '../../auth/services/token-handler.service';
@Injectable()
export class UserService {
  /* User static properties (received from the backend) */
  private _username: string;
  private _userType: string;

  constructor(private teamsService: TeamsService, loginStatusService: LoginStatusService, tokenHandler: TokenHandlerService) {
    this.setLoggedInUserInfo();
    loginStatusService.$userLoggedIn.subscribe(loginInfo => {
      if (loginInfo) {
        this.setLoggedInUserInfo(tokenHandler.decodeToken(loginInfo.token)); // this.loginResponse,
      } else {
        this.resetData();
      }
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
   * @description returns the user type (ordinary user or admin) for the logged in user
   * @readonly
   * @type {string}
   */
  get userType(): string {
    return this._userType;
  }

  /**
   * @author Nermeen Mattar
   * @description sets the user type (ordinary user or admin) in a private variable then it either sets it in the localstorage or
   * remove it from the localstorage
   * @param {userType} string
   */
  set userType(userType: string) {
    userType = userType ? userType.toLowerCase() : '';
    /* above line is a preventive check to prevent toLowerCase from causing errors when user type is set to undefined */
    this._userType = userType;
    if (userType) {
      localStorage.setItem('userType', userType);
    } else {
      localStorage.removeItem('userType');
    }
  }

  /**
   * @author Nermeen Mattar
   * @description sets the class properties (username, team roles, and user type ordinary/admin) either from the decoded token (immediately
   * after logging in) or from the localStorage (in case a logged in user refreshed the page)
   * Side note: there are duplicated info between token and loginResponse. Had to decode the token as login response only do not have sub!
   * @param {DecodedToken} decodedToken
   */
  setLoggedInUserInfo(decodedToken ?: DecodedToken) {
    if (decodedToken) {
      this.userType = decodedToken.grantedRole;
      this.username = decodedToken.sub;
      this.teamsService.initTeamRolesAndTeamsList(decodedToken.teamRoles);
    } else {
      this.userType = localStorage.getItem('userType');
      this.username = localStorage.getItem('username');
    }
  }

  /**
   * @author Nermeen Mattar
   * @description resets the class variables
   */
  resetData() {
    this.username = null;
    this.userType = null;
    this.teamsService.resetData();
  }
}
