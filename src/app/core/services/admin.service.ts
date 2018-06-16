import { UserService } from './user.service';
import { Observable } from 'rxjs/internal/Observable';
import { Injectable } from '@angular/core';

import { HttpRequestsService } from './http-requests.service';
import { TeamsService } from './teams.service';
@Injectable()
export class AdminService {

  constructor(private httpRequestService: HttpRequestsService, private userService: UserService, private teamsService: TeamsService) {}

  /**
   * @author Nermeen Mattar
   * @description Uses the httpRequestsSevrice to send a post request to the backend to check whether the received email belongs to an
   * already existed admin. Note that an object of type UserMessages is being sent with an empty fail property to disable defulat error.
   * @param emailObj
   */
  isAdminExist(email: string): Observable < any > {
    return this.httpRequestService.httpPost('teamadmins/check', {
      email: email
    }, {
      fail: 'NO_ERROR_MESSAGE'
    });
  }

  /**
   * @author Nermeen Mattar
   * @description attemps to update the admin password Using the httpPut function from httpRequestsSevrice.
   * @param {any} oldAndNewPasswords
   */
  changeAdminPassword(oldAndNewPasswords) {
    this.httpRequestService.httpPut('teamadmins/change_admin_password', oldAndNewPasswords, {
      success: 'ADMIN.ADMIN_PASSWORD_CHANGING_SUCCESS',
      failDefault: 'ADMIN.ADMIN_PASSWORD_CHANGING_FAIL'
    }).subscribe(res => {});
  }

  /**
   * @author Nermeen Mattar
   * @description attemps to update the team password Using the httpPut function from httpRequestsSevrice.
   * @param {any} oldAndNewPasswords
   * @param {number} teamId
   */
  changeTeamPassword(oldAndNewPasswords, teamId: number) {
    this.httpRequestService.httpPut('teams/' + teamId + '/change_team_password', oldAndNewPasswords, {
      success: 'TEAM.TEAM_PASSWORD_CHANGING_SUCCESS',
      failDefault: 'TEAM.TEAM_PASSWORD_CHANGING_FAIL'
    }).subscribe(res => {});
  }

  /**
   * @author Nermeen Mattar
   * @description requests a new direct link for the passed team.
   * @param {teamId} number
   */
  changeDirectLink(teamId: number): Observable <any> {
    return this.httpRequestService.httpPut('teams/' + teamId + '/change_direct_link', {
      failDefault: 'TEAM.DIRECT_LINK_CHANGING_FAIL'
    });
  }
}
