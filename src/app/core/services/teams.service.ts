import { Injectable } from '@angular/core';

import { TcTeamInfo } from './../../teams/models/tc-team-info.model';
@Injectable({
  providedIn: 'root'
})
export class TeamsService {
  private _userTeams: TcTeamInfo[];
  private _selectedTeamId: number;
  constructor() {
    this.selectedTeamId = JSON.parse(localStorage.getItem('selectedTeamId'));
    this.userTeams = JSON.parse(localStorage.getItem('userTeams'));
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
   * @description updated the team name for the team with the passed teamId
   * @param {number} teamId
   * @param {string} newTeamName
   */
  updateTeamName(teamId: number, newTeamName: string) {
    this.userTeams.filter(team => team.teamId === teamId)[0].teamName = newTeamName;
    localStorage.setItem('userTeams', JSON.stringify(this.userTeams));
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

}
