
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { TeamsService } from './teams.service';
import { DecodedToken } from './../../auth/models/decoded-token.model';
import { TcTeamInfo } from './../../teams/models/tc-team-info.model';
import { TcClientSideTeamRoles } from './../../teams/models/tc-client-side-team-roles.model';
import { TcServerSideTeamRoles } from '../../teams/models/tc-server-side-team-roles.model';
@Injectable()
export class UserService {
  /* User static properties (received from the backend) */
  private _username: string;
  private _userType: string;
  private _teamRoles: TcClientSideTeamRoles;
  /* user state properties */
  private isAdmin: BehaviorSubject < boolean > = new BehaviorSubject(false);
  $userAdmin: Observable < boolean > = this.isAdmin.asObservable();

  constructor(private teamsService: TeamsService) {
    this.setLoggedInUserInfo();
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
   * @description sets the username/email in a private variable then it either sets it in the localstorage or remove it from the
   * localstorage
   * @param {username} string
   */
  set username(username: string) {
    this._username = username;
    if (username) {
      localStorage.setItem('username', username);
    } else {
      localStorage.removeItem('username');
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
   * @description returns the user type (ordinary user or admin) for the logged in user
   * @readonly
   * @type {string}
   */
  get userType(): string {
    return this._userType;
  }

  /**
   * @author Nermeen Mattar
   * @description sets the user type (ordinary user or admin) in a private variable then it either sets it in the localstorage or
   * remove it from the localstorage
   * @param {userType} string
   */
  set userType(userType: string) {
    userType = userType ? userType : ''; // a preventive check to prevent toLowerCase for causing errors when user type is set to undefined
    this.isAdmin.next(userType.toLowerCase() === 'admin');
    this._userType = userType;
    if (userType) {
      localStorage.setItem('userType', userType);
    } else {
      localStorage.removeItem('userType');
    }
  }

  /**
   * @author Nermeen Mattar
   * @description sets the class properties (username, team roles, and user type ordinary/admin) either from the decoded token (immediately
   * after logging in) or from the localStorage (in case a logged in user refreshed the page)
   * Side note: there are duplicated info between token and loginResponse. Had to decode the token as login response only do not have sub!
   * @param {DecodedToken} decodedToken
   */
  setLoggedInUserInfo(decodedToken ? : DecodedToken) {
    if (decodedToken) {
      this.userType = decodedToken.grantedRole;
      this.username = decodedToken.sub;
      this.initTeamRolesAndTeamsList(decodedToken.teamRoles);
    } else {
      this.userType = localStorage.getItem('userType');
      this.username = localStorage.getItem('username');
      this.teamRoles = JSON.parse(localStorage.getItem('teamRoles'));
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
    this.teamsService.userTeams = teamsList;
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
    const normalizedTeamRole = teamRoleName === 'teamAdmins' ? 'admin' : 'member';
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
   * @description clears the username, team roles, user type ordinary/admin, and user teams.
   */
  clearLoggedInUserInfo() {
    this.username = null;
    this.teamRoles = null;
    this.userType = null;
    this.teamsService.userTeams = null;
  }
}
