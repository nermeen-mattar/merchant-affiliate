import { Injectable } from '@angular/core';

import { TcTeamInfo } from './../../teams/models/tc-team-info.model';
import { TcClientSideTeamRoles } from './../../teams/models/tc-client-side-team-roles.model';
import { TcServerSideTeamRoles } from '../../teams/models/tc-server-side-team-roles.model';
import { roles } from '../constants/roles.constants';
@Injectable({
  providedIn: 'root'
})
export class TeamsService {
  private _userTeams: TcTeamInfo[];
  private _selectedTeamId: number;
  private _teamRoles: TcClientSideTeamRoles;
  constructor() {
    this.selectedTeamId = JSON.parse(localStorage.getItem('selectedTeamId'));
    this.userTeams = JSON.parse(localStorage.getItem('userTeams'));
    this.teamRoles = JSON.parse(localStorage.getItem('teamRoles'));
  }

  /**
   * @author Nermeen Mattar
   * @description returns the team roles for the logged in user
   * @readonly
   * @type {TcClientSideTeamRoles}
   */
  get teamRoles(): TcClientSideTeamRoles {
    return this._teamRoles;
  }

  /**
   * @author Nermeen Mattar
   * @description sets the team roles in a private variable then it either sets them in the localstorage or remove them from the
   *  localstorage
   * @param {teamRoles} TcClientSideTeamRoles
   */
  set teamRoles(teamRoles: TcClientSideTeamRoles) {
    this._teamRoles = teamRoles;
    if (this.teamRoles) {
      localStorage.setItem('teamRoles', JSON.stringify(teamRoles));
    } else {
      localStorage.removeItem('teamRoles');
    }
  }
  /**
   * @author Nermeen Mattar
   * @description prepares an array for teams list and an array for teams roles then calls a function to fill the two arrays. The function
   * is called twice; first to push the teams the user is admin of and second to push the teams the user is member of. The result of the two
   * calls is combined.
   * @param {TcServerSideTeamRoles} backendTeamRoles
   */
  initTeamRolesAndTeamsList(backendTeamRoles: TcServerSideTeamRoles) {
    const teamsList: TcTeamInfo[] = [];
    const teamRoles: TcClientSideTeamRoles = {};

    this.pushTeamRolesAndTeamsList(backendTeamRoles['teamAdmins'], 'teamAdmins', teamRoles, teamsList);
    this.pushTeamRolesAndTeamsList(backendTeamRoles['teamMembers'], 'teamMembers', teamRoles, teamsList);

    this.teamRoles = teamRoles;
    this.userTeams = teamsList;
  }

  /**
   * @author Nermeen Mattar
   * @description check wether the user with the passed id has a member role
   * @param {number} teamId
   * @returns {boolean}
   */
  hasMemberRole(teamId: number): boolean {
    return this.teamRoles.teamMembers.indexOf(teamId) !== -1;
  }

  /**
   * @author Nermeen Mattar
   * @description check wether the user with the passed id has an admin role
   * @param {number} teamId
   * @returns {boolean}
   */
  hasAdminRole(teamId: number): boolean {
    return this.teamRoles.teamAdmins.indexOf(teamId) !== -1;
  }

  /**
   * @author Nermeen Mattar
   * @description pushes teams to the teams list to combine the teams that the user is admin of with the teams that the user is member of.
   * Then it sets the teamRoles to the backendTeamRoles after mapping it to the clientSideTeamRoles. Mapping happens by changing teams
   * property from array of TcTeamInfo objects to array of numbers.
   *
   *
   * @param {TcTeamInfo[]} backendTeams
   * @param {string} teamRoleName
   * @param {TcClientSideTeamRoles} teamRoles
   * @param {TcTeamInfo[]} teamsList
   */
  pushTeamRolesAndTeamsList(backendTeams: TcTeamInfo[], teamRoleName: string, teamRoles: TcClientSideTeamRoles, teamsList: TcTeamInfo[]) {
    teamRoles[teamRoleName] = [];
    const normalizedTeamRole = teamRoleName === 'teamAdmins' ? roles.admin : roles.member;
    const backendTeamsLen = backendTeams.length;
    for (let teamIndex = 0; teamIndex < backendTeamsLen; teamIndex++) {
      const teamToUpdate: TcTeamInfo = teamsList.filter(team => team.teamId === backendTeams[teamIndex].teamId)[0];
      if (teamToUpdate) {
        teamToUpdate.roles.push(normalizedTeamRole);
      } else {
        teamsList.push({
          roles: [normalizedTeamRole],
          ...backendTeams[teamIndex]
        });
      }
      teamRoles[teamRoleName].push(backendTeams[teamIndex].teamId);
    }
  }

  /**
   * @author Nermeen Mattar
   * @description filters the teams list to get only the teams that the user is admin of and sets this value in the teamsTheUserIsAdminOf.
   */
  getTeamsTheUserIsAdminOf() {
    return this.userTeams.filter( team => this.teamRoles.teamAdmins.indexOf(team.teamId) !== -1);
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
   * @description each time we set new user teams we initialize the selected team by the first one
   */
  set userTeams(userTeams: TcTeamInfo[]) {
    this._userTeams = userTeams;
    if (userTeams) {
      localStorage.setItem('userTeams', JSON.stringify(userTeams));
      if (!this.selectedTeamId) {
        this.selectedTeamId = this._userTeams[0].teamId; // sets an initial value to the select input
      }
    } else {
      this.selectedTeamId = undefined;
      localStorage.removeItem('userTeams');
    }
  }

  /**
   * @author Nermeen Mattar
   * @description updates the team name for the team with the passed teamId
   * @param {number} teamId
   * @param {string} newTeamName
   */
  updateTeamName(teamId: number, newTeamName: string) {
    this.userTeams.filter(team => team.teamId === teamId)[0].teamName = newTeamName;
    localStorage.setItem('userTeams', JSON.stringify(this.userTeams));
  }

  /**
   * @author Nermeen Mattar
   * @description adds a new team role (if not already exist) to the user roles for the team with the passed teamId
   * @param {number} teamId
   * @param {string} newTeamRole
   */
  addTeamRole(teamId: number, newTeamRole: string) {
    const teamToModify =  this.userTeams.filter(team => team.teamId === teamId)[0];
    if (newTeamRole && roles[newTeamRole] && teamToModify.roles.indexOf(newTeamRole) === -1 ) {
      teamToModify.roles.push(newTeamRole);
      localStorage.setItem('userTeams', JSON.stringify(this.userTeams));
    }
  }

  /**
   * @author Nermeen Mattar
   * @description deletes the team with the passed teamId
   * @param {number} teamId
   */
  deleteTeam(teamId: number) {
    this.userTeams = this.userTeams.filter(userTeam => userTeam.teamId !== teamId);
  }

  /**
   * @author Nermeen Mattar
   * @description returns team the user has selected from the list of team he/she is admin/member of.
   */
  get selectedTeamId(): number {
    return this._selectedTeamId;
  }

  /**
   * @author Nermeen Mattar
   * @description sets the selected team in a private variable and in the localstorage based on the user selection from the list of teams
   * he/she is admin/member of.
   */
  set selectedTeamId(selectedTeamId: number) {
    this._selectedTeamId = selectedTeamId;
    if (selectedTeamId) {
      localStorage.setItem('selectedTeamId', JSON.stringify(selectedTeamId));
    } else {
      localStorage.removeItem('selectedTeamId');
    }
  }

  /**
   * @author Nermeen Mattar
   * @description resets the class variables
   */
  resetData() {
    this.userTeams = null;
    this.teamRoles = null;
  }
}
