import { Injectable } from '@angular/core';

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
    if (this.teamRoles) {
      this.setUserTeams();
    }
  }

  /**
   * @author Nermeen Mattar
   * @description sets the user's teams by combining the teams that the user is admin of with the teams that the user is member of
   * each time we set new user teams we initialize the selected team by the first one
   */
  setUserTeams() {
    this.userTeams = [];
    const teamIds = [];
    const teamRoles = this.getTeamRoles();
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
   * @description stores the username, the team roles, and the user type ordinary/admin in the local storage and in private variables
   * @param {string} username
   * @param {TcTeamRoles} teamRoles
   */
  storeLoggedInUserInfo(username: string, teamRoles: TcTeamRoles, userType: string) {
    this.setUsername(username);
    localStorage.setItem('username', JSON.stringify(username));
    this.setTeamRoles(teamRoles);
    localStorage.setItem('teamRoles', JSON.stringify(teamRoles));
    this.setUserType(userType);
    localStorage.setItem('userType', JSON.stringify(userType));
  }
}
