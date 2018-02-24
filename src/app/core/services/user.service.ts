import { Injectable } from '@angular/core';

import { TeamRoles } from './../../teams/models/team-roles.model';

@Injectable()
export class UserService {
  private username: string;
  private teamRoles: TeamRoles;
  private userType: string;

  constructor() {
    this.setUsername(JSON.parse(localStorage.getItem('username')));
    this.setTeamRoles(JSON.parse(localStorage.getItem('teamRoles')));
    this.setUserType(JSON.parse(localStorage.getItem('userType')));
  }

  /**
   * @author Nermeen Mattar
   * @description returns the username/email for the logged in user
   * @readonly
   * @type {string}
   */
  getUsername(): string {
    return this.username;
  }
  /**
   * @author Nermeen Mattar
   * @description sets the username/email in a private variable
   * @param {username} string
   */
  setUsername(username: string) {
    this.username = username;
  }

  /**
   * @author Nermeen Mattar
   * @description returns the team roles for the logged in user
   * @readonly
   * @type {TeamRoles}
   */
  getTeamRoles(): TeamRoles {
    return this.teamRoles;
  }
  /**
   * @author Nermeen Mattar
   * @description sets the team roles in a private variable
   * @param {teamRoles} TeamRoles
   */
  setTeamRoles(teamRoles: TeamRoles) {
    this.teamRoles = teamRoles;
  }

  /**
   * @author Nermeen Mattar
   * @description returns the user type (ordinary user or admin) for the logged in user
   * @readonly
   * @type {string}
   */
  getUserType(): string {
    return this.userType;
  }

  /**
   * @author Nermeen Mattar
   * @description sets the user type (ordinary user or admin) in a private variable
   * @param {userType} string
   */
  setUserType(userType: string) {
    this.userType = userType;
  }

  /**
   * @author Nermeen Mattar
   * @description stores the username, the team roles, and the user type ordinary/admin in the local storage and in private variables
   * @param {string} username
   * @param {TeamRoles} teamRoles
   */
  storeLoggedInUserInfo(username: string, teamRoles: TeamRoles, userType: string) {
    this.setUsername(username);
    localStorage.setItem('username', JSON.stringify(username));
    this.setTeamRoles(teamRoles);
    localStorage.setItem('teamRoles', JSON.stringify(teamRoles));
    this.setUserType(userType);
    localStorage.setItem('userType', JSON.stringify(userType));
  }
}
