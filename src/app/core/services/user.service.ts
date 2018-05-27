import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { DecodedToken } from './../../auth/models/decoded-token.model';
import { TcTeamInfo } from './../../teams/models/tc-team-info.model';
import { TcTeamRoles } from './../../teams/models/tc-team-roles.model';
import { Observable } from 'rxjs/internal/Observable';

@Injectable()
export class UserService {
  /* User static properties (received from the backend) */
  private _username: string;
  private _userType: string;
  private _teamRoles: TcTeamRoles;
  private _userTeams: TcTeamInfo[];
  /* user changable properties (can be changed on the client side)*/
  private _selectedTeam: TcTeamInfo;
  /* user state properties */
  private isAdmin: BehaviorSubject < boolean > = new BehaviorSubject(false);
  $userAdmin: Observable < boolean > = this.isAdmin.asObservable();

  constructor() {}

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
    if (this.teamRoles){
      this.setUserTeams();
    }
  }

  /**
   * @author Nermeen Mattar
   * @description sets the user's teams by combining the teams that the user is admin of with the teams that the user is member of
   * each time we set new user teams we initialize the selected team by the first one
   */
  setUserTeams() {
    this._userTeams = [];
    if (!this.teamRoles) {
      this.selectedTeam = undefined; // sets an initial value to the select input
    } else {
      const teamIds = [];
      Object.keys(this.teamRoles).forEach( teamRole => {
        const teams = this.teamRoles[teamRole];
        const teamRoleTranslateKey = teamRole === 'teamAdmins' ? 'admin' : 'member';
        const teamsLen = teams.length;
        for (let teamIndex = 0; teamIndex < teamsLen; teamIndex++) {
          const team = teams[teamIndex];
          if (teamIds.indexOf(team.teamId) === -1) {
            this._userTeams.push({roles: [teamRoleTranslateKey], ...team});
            teamIds.push(team.teamId);
          } else {
            this._userTeams[teamIndex].roles.push(teamRoleTranslateKey);
          }
        }
      });
      this.selectedTeam = this._userTeams[0]; // sets an initial value to the select input
    }
  }

  /**
   * @author Nermeen Mattar
   * @description returns the team roles for the logged in user
   * @returns {TcTeamInfo[]}
   */

  get userTeams(): TcTeamInfo[] {
    return this._userTeams;
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
   * @description sets the selected team in a private variable based on the user selection from the list of teams he/she is admin/member of.
   */
  set selectedTeam(selectedTeam: TcTeamInfo) {
    this._selectedTeam = selectedTeam;
  }

  /**
   * @author Nermeen Mattar
   * @description returns team the user has selected from the list of team he/she is admin/member of.
   */
  get selectedTeam(): TcTeamInfo {
    return this._selectedTeam;
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
