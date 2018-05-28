import { Injectable } from '@angular/core';

import { TcTeamInfo } from './../../teams/models/tc-team-info.model';
import { TcTeamRoles } from './../../teams/models/tc-team-roles.model';

@Injectable({
  providedIn: 'root'
})
export class TeamsService {
  private _userTeams: TcTeamInfo[];
  private _selectedTeamId: number;
  constructor() {}

  /**
   * @author Nermeen Mattar
   * @description sets the user's teams by combining the teams that the user is admin of with the teams that the user is member of
   * each time we set new user teams we initialize the selected team by the first one
   */
  setUserTeams(teamRoles: TcTeamRoles) {
    this._userTeams = [];
    if (!teamRoles) {
      this.selectedTeamId = undefined; // sets an initial value to the select input
    } else {
      const teamIds = [];
      Object.keys(teamRoles).forEach(teamRole => {
        const teams = teamRoles[teamRole];
        const teamRoleTranslateKey = teamRole === 'teamAdmins' ? 'admin' : 'member';
        const teamsLen = teams.length;
        for (let teamIndex = 0; teamIndex < teamsLen; teamIndex++) {
          const team = teams[teamIndex];
          if (teamIds.indexOf(team.teamId) === -1) {
            this._userTeams.push({
              roles: [teamRoleTranslateKey],
              ...team
            });
            teamIds.push(team.teamId);
          } else {
            this._userTeams[teamIndex].roles.push(teamRoleTranslateKey);
          }
        }
      });
      if (!this.selectedTeamId) {
        this.selectedTeamId = this._userTeams[0].teamId; // sets an initial value to the select input
      }
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
   * @description returns team the user has selected from the list of team he/she is admin/member of.
   */
  get selectedTeamId(): number {
    return this._selectedTeamId;
  }

  /**
   * @author Nermeen Mattar
   * @description sets the selected team in a private variable based on the user selection from the list of teams he/she is admin/member of.
   */
  set selectedTeamId(selectedTeam: number) {
    this._selectedTeamId = selectedTeam;
  }

}
