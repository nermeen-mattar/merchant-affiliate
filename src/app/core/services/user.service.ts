import { Injectable } from '@angular/core';

import { TeamInfo } from './../../teams/models/team-info.model';
import { TeamRoles } from './../../teams/models/team-roles.model';

@Injectable()
export class UserService {
  /* User static properties (received from the backend) */
  private username: string;
  private userType: string;
  private teamRoles: TeamRoles;
  private userTeams: TeamInfo[];
  /* user changable properties (can be changed on the client side)*/
  private selectedTeam: TeamInfo;
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
    this.getTeamRoles().teamAdmins.forEach(team => {
      this.userTeams.push(team);
      teamIds.push(team.teamId);
    });
    this.getTeamRoles().teamMembers.forEach(team => {
      if (teamIds.indexOf(team.teamId) === -1) {
        this.userTeams.push(team);
      }
    });
    this.setSelectedTeam(this.userTeams[0]); // sets an initial value to the select input
  }

 /**
  * @author Nermeen Mattar
  * @description returns the team roles for the logged in user
  * @returns {TeamInfo[]}
  */

 getUserTeams(): TeamInfo[] {
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
  setSelectedTeam(selectedTeam: TeamInfo) {
    this.selectedTeam = selectedTeam;
  }

  /**
   * @author Nermeen Mattar
   * @description returns team the user has selected from the list of team he/she is admin/member of.
   */
  getSelectedTeam(): TeamInfo {
    return this.selectedTeam;
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
