import { Observable } from 'rxjs/internal/Observable';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { TeamsService } from './teams.service';
import { TcDateRange } from './../../shared/models/tc-date-range.model';
import { DecodedToken } from './../../auth/models/decoded-token.model';
import { TcTeamRoles } from './../../teams/models/tc-team-roles.model';
@Injectable()
export class UserService {
  /* User static properties (received from the backend) */
  private _username: string;
  private _userType: string;
  private _teamRoles: TcTeamRoles;
  /* user state properties */
  private isAdmin: BehaviorSubject < boolean > = new BehaviorSubject(false);
  $userAdmin: Observable < boolean > = this.isAdmin.asObservable();

  constructor(private teamsService: TeamsService) {}

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
   * @description sets the username/email in a private variable
   * @param {username} string
   */
  set username(username: string) {
    this._username = username;
  }

  /**
   * @author Nermeen Mattar
   * @description returns the team roles for the logged in user
   * @readonly
   * @type {TcTeamRoles}
   */
  get teamRoles(): TcTeamRoles {
    return this._teamRoles;
  }

  /**
   * @author Nermeen Mattar
   * @description sets the team roles in a private variable
   * @param {teamRoles} TcTeamRoles
   */
  set teamRoles(teamRoles: TcTeamRoles) {
    this._teamRoles = teamRoles;
    if (this.teamRoles) {
      this.teamsService.setUserTeams(teamRoles);
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
   * @description sets the user type (ordinary user or admin) in a private variable
   * @param {userType} string
   */
  set userType(userType: string) {
    userType = userType ? userType : ''; // a preventive check to prevent toLowerCase for causing errors when user type is set to undefined
    this.isAdmin.next(userType.toLowerCase() === 'admin');
    this._userType = userType;
  }

  /**
   * @author Nermeen Mattar
   * @description sets the class properties (username, team roles, and user type ordinary/admin)
   * @param {LoginResponse} loginResponse
   * @param {DecodedToken} decodedToken
   */
  /* there are duplicated info between decoded token and loginResponse. Had to decode the token as login response only do not have sub!! */
  setLoggedInUserInfo(decodedToken: DecodedToken) {
    if (decodedToken) {
      this.userType = decodedToken.grantedRole;
      this.username = decodedToken.sub;
      this.teamRoles = decodedToken.teamRoles;
    }
  }

  /**
   * @author Nermeen Mattar
   * @description clears the class properties (username, team roles, and user type ordinary/admin).
   */
  clearLoggedInUserInfo() {
    this.username = null;
    this.teamRoles = null;
    this.userType = null;
  }
}
