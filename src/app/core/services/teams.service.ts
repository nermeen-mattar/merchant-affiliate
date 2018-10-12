
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

import { TcTeamInfo } from './../../teams/models/tc-team-info.model';
import { TcClientSideTeamRoles } from './../../teams/models/tc-client-side-team-roles.model';
import { TcServerSideTeamRoles } from '../../teams/models/tc-server-side-team-roles.model';
import { HttpRequestsService } from './http-requests.service';
@Injectable()

export class TeamsService {
  private _userTeams: TcTeamInfo[];
  private _selectedTeamId: number;
  private _teamRoles: TcClientSideTeamRoles;
  constructor(private httpRequestService: HttpRequestsService) {
    this.selectedTeamId = JSON.parse(localStorage.getItem('selectedTeamId'));
    this.userTeams = JSON.parse(localStorage.getItem('userTeams'));
    this.teamRoles = JSON.parse(localStorage.getItem('teamRoles'));
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
    // const normalizedTeamRole = teamRoleName === 'teamAdmins' ? roles.admin : roles.member;
    const backendTeamsLen = backendTeams.length;
    for (let teamIndex = 0; teamIndex < backendTeamsLen; teamIndex++) {
      const teamToUpdate: TcTeamInfo = teamsList.filter(team => team.teamId === backendTeams[teamIndex].teamId)[0];
      if (teamToUpdate) {
        // teamToUpdate.roles.push(normalizedTeamRole);
      } else {
        teamsList.push({
          // roles: [normalizedTeamRole],
          ...backendTeams[teamIndex]
        });
      }
      teamRoles[teamRoleName].push(backendTeams[teamIndex].teamId);
    }
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
      if (!this.selectedTeamId && this._userTeams[0]) {
        this.selectedTeamId = this._userTeams[0].teamId; // sets an initial value to the select input
      }
    } else {
      this.selectedTeamId = undefined;
      localStorage.removeItem('userTeams');
    }
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
   * @description filters the teams list to get only the teams that the user is admin of and sets this value in the teamsTheUserIsAdminOf.
   */
  getTeamsTheUserIsAdminOf() {
    return this.userTeams.filter(team => this.teamRoles.teamAdmins.includes(team.teamId));
  }

  /**
   * @author Nermeen Mattar
   * @description attemps to update the team name for the team with the passed teamId using the httpPut function from httpRequestsSevrice.
   * Upon successful request the team name for the modifier team will be changed in team roles.
   * @param {string} newTeamName
   * @param {number} teamId
   */
  changeTeamName(newTeamName: string, teamId: number) {
    this.httpRequestService.httpPut('teams/' + teamId + '/change_team_name', {
      teamName: newTeamName
    }, {
      success: 'TEAM.TEAM_NAME_CHANGING_SUCCESS',
      failDefault: 'TEAM.TEAM_NAME_CHANGING_FAIL'
    }).subscribe(res => {
      this.userTeams.filter(team => team.teamId === teamId)[0].teamName = newTeamName;
      localStorage.setItem('userTeams', JSON.stringify(this.userTeams));
    });
  }

  /**
   * @author Ahsan Ayaz
   * @desc Sends the add team server call and creates a team
   * @param teamName - the name of the team to be created
   */
  addTeam(teamName: string) {
    this.httpRequestService.httpPost('teams', {
      teamName
    }, {
      success: 'TEAM.TEAM_CREATED_SUCCESS',
      failDefault: 'TEAM.TEAM_CREATED_FAILURE'
    }).subscribe(res => {
      this.userTeams.unshift(res.team);
      localStorage.setItem('userTeams', JSON.stringify(this.userTeams));
    });
  }

  /**
   * @author Nermeen Mattar
   * @description check wether the user with the passed id has a member role
   * @param {number} teamId
   * @returns {boolean}
   */
  hasMemberRole(teamId ?: number): boolean {
    if (teamId) {
      return this.teamRoles.teamMembers.includes(teamId);
    } else {
      return Boolean(this.teamRoles.teamMembers.length); /* may move this line to the user service */
    }
  }

  /**
   * @author Nermeen Mattar
   * @description check wether the user with the passed id has an admin role
   * @param {number} teamId
   * @returns {boolean}
   */
  hasAdminRole(teamId ?: number): boolean {
    if (teamId) {
      return this.teamRoles.teamAdmins.includes(teamId);
    } else {
      if (this.teamRoles.teamAdmins) {
        return Boolean(this.teamRoles.teamAdmins.length);
      }
      return false;
    }
  }

  /**
   * @author Nermeen Mattar
   * @description adds a member role (if not already exist) to the user roles for the team with the passed teamId
   * @param {number} teamId
   */
  addMemberRole(teamId: number) {
    if (!this.teamRoles.teamMembers.includes(teamId)) { /* may generalize this to be addRole(rolename) */
      this.teamRoles.teamMembers.push(teamId);
      localStorage.setItem('teamRoles', JSON.stringify(this.teamRoles));
    }
  }

  /**
   * @author Nermeen Mattar
   * @description removes the member role from the user roles for the team with the passed teamId
   * @param {number} teamId
   */
  removeMemberRole(teamId: number) {
    this.teamRoles.teamMembers = this.teamRoles.teamMembers.filter(currTeamId => currTeamId !== teamId);
    this.teamRoles = this.teamRoles;
  }

  /**
   * @author Nermeen Mattar
   * @description removes the admin role from the user roles for the team with the passed teamId
   * @param {number} teamId
   */
  removeAdminRole(teamId: number) {
    this.teamRoles.teamAdmins = this.teamRoles.teamAdmins.filter(currTeamId => currTeamId !== teamId);
    this.teamRoles = this.teamRoles;
  }

  /**
   * @author Nermeen Mattar
   * @description deletes the team with the passed teamId
   * @param {number} teamId
   */
  deleteTeam(teamId: number): Observable < any > {
    return this.httpRequestService.httpDelete(`teams/${teamId}`, {
      success: 'TEAM.TEAM_DELETING_SUCCESS',
      failDefault: 'TEAM.TEAM_DELETING_ERROR'
    }).pipe(map(res => {
      this.removeAdminRole(teamId);
      this.removeMemberRole(teamId);
      this.userTeams = this.userTeams.filter(userTeam => userTeam.teamId !== teamId);
      if (teamId === this.selectedTeamId && this.userTeams.length) {
        this.selectedTeamId = this.userTeams[0].teamId;
      }
      return res;
    }));
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
