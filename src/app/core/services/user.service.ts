import { Injectable } from '@angular/core';

import { TeamRoles } from './../../teams/models/team-roles.model';

@Injectable()
export class UserService {
  private _username: string;
  private _teamRoles: TeamRoles;
  private _userType: string;

  constructor() {
    this._username = JSON.parse(localStorage.getItem('username'));
    this._teamRoles = JSON.parse(localStorage.getItem('teamRoles'));
    this._userType = JSON.parse(localStorage.getItem('userType'));
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
   * @type {TeamRoles}
   */
  get teamRoles(): TeamRoles {
    return this._teamRoles;
  }
  /**
   * @author Nermeen Mattar
   * @description sets the team roles in a private variable
   * @param {teamRoles} TeamRoles
   */
  set teamRoles(teamRoles: TeamRoles) {
    this._teamRoles = teamRoles;
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
    this._userType = userType;
  }

  /**
   * @author Nermeen Mattar
   * @description stores the username, the team roles, and the user type ordinary/admin in the local storage and in private variables
   * @param {string} username
   * @param {TeamRoles} teamRoles
   */
  storeLoggedInUserInfo(username: string, teamRoles: TeamRoles, userType: string) {
    this._username = username;
    localStorage.setItem('username', JSON.stringify(username));
    this._teamRoles = teamRoles;
    localStorage.setItem('teamRoles', JSON.stringify(teamRoles));
    this._userType = userType;
    localStorage.setItem('userType', JSON.stringify(userType));
  }
}
