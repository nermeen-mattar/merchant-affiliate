import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { DecodedToken } from './../../auth/models/decoded-token.model';
import { TcTeamInfo } from './../../teams/models/tc-team-info.model';
import { TcTeamRoles } from './../../teams/models/tc-team-roles.model';

@Injectable()
export class UserService {
  /* User static properties (received from the backend) */
  private username: string;
  private userType: string;
  private teamRoles: TcTeamRoles;
  private userTeams: TcTeamInfo[];
  /* user changable properties (can be changed on the client side)*/
  private selectedTeam: TcTeamInfo;
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
   * @type {TcTeamRoles}
   */
  getTeamRoles(): TcTeamRoles {
    return this.teamRoles;
  }
  /**
   * @author Nermeen Mattar
   * @description sets the team roles in a private variable
   * @param {teamRoles} TcTeamRoles
   */
  setTeamRoles(teamRoles: TcTeamRoles) {
    this.teamRoles = teamRoles;
    this.setUserTeams();
  }

  /**
   * @author Nermeen Mattar
   * @description sets the user's teams by combining the teams that the user is admin of with the teams that the user is member of
   * each time we set new user teams we initialize the selected team by the first one
   */
  setUserTeams() {
    this.userTeams = [];
    const teamRoles = this.getTeamRoles();
    if (teamRoles === undefined) {
      this.setSelectedTeam(undefined); // sets an initial value to the select input
    } else {
      const teamIds = [];
      Object.keys(teamRoles).forEach( teamRole => {
        const teams = teamRoles[teamRole];
        const teamRoleTranslateKey = teamRole === 'teamAdmins' ? 'admin' : 'member';
        const teamsLen = teams.length;
        for (let teamIndex = 0; teamIndex < teamsLen; teamIndex++) {
          const team = teams[teamIndex];
          if (teamIds.indexOf(team.teamId) === -1) {
            this.userTeams.push({roles: [teamRoleTranslateKey], ...team});
            teamIds.push(team.teamId);
          } else {
            this.userTeams[teamIndex].roles.push(teamRoleTranslateKey);
          }
        }
      });
      this.setSelectedTeam(this.userTeams[0]); // sets an initial value to the select input
    }
  }

  /**
   * @author Nermeen Mattar
   * @description returns the team roles for the logged in user
   * @returns {TcTeamInfo[]}
   */

  getUserTeams(): TcTeamInfo[] {
    return this.userTeams;
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
    userType = userType ? userType : ''; // a preventive check to prevent toLowerCase for causing errors when user type is set to undefined
    this.isAdmin.next(userType.toLowerCase() === 'admin');
    this.userType = userType;
  }

  /**
   * @author Nermeen Mattar
   * @description sets the selected team in a private variable based on the user selection from the list of teams he/she is admin/member of.
   */
  setSelectedTeam(selectedTeam: TcTeamInfo) {
    this.selectedTeam = selectedTeam;
  }

  /**
   * @author Nermeen Mattar
   * @description returns team the user has selected from the list of team he/she is admin/member of.
   */
  getSelectedTeam(): TcTeamInfo {
    return this.selectedTeam;
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
      this.setUserType(decodedToken.grantedRole);
      this.setUsername(decodedToken.sub);
      this.setTeamRoles(decodedToken.teamRoles);
    }
  }

  /**
   * @author Nermeen Mattar
   * @description clears the class properties (username, team roles, and user type ordinary/admin).
   */
  clearLoggedInUserInfo() {
    this.setUsername(undefined);
    this.setTeamRoles(undefined);
    this.setUserType(undefined);
  }
}
