import { Observable } from 'rxjs/internal/Observable';
import { Injectable } from '@angular/core';

import { UserService } from './user.service';
import { HttpRequestsService } from './http-requests.service';

@Injectable()
export class AdminService {

  constructor(private httpRequestService: HttpRequestsService, private userService: UserService) { }

  /**
   * @author Nermeen Mattar
   * @description Uses the httpRequestsSevrice to send a post request to the backend to check whether the received email belongs to an
   * already existed admin. Note that an object of type UserMessages is being sent with an empty fail property to disable defulat error.
   * @param emailObj
   */
  isAdminExist(email: string): Observable < any > {
    return this.httpRequestService.httpPost('teamadmins/check', {email: email}, {fail: 'NO_ERROR_MESSAGE'});
  }

  /**
   * @author Nermeen Mattar
   * @description attemps to update the admin password Using the httpPut function from httpRequestsSevrice.
   * @param {any} oldAndNewPasswords
   */
  changeAdminPassword(oldAndNewPasswords): any {
   this.httpRequestService.httpPut('teamadmins/change_admin_password', oldAndNewPasswords,
    {
      success: 'ADMIN.ADMIN_PASSWORD_CHANGING_SUCCESS',
      fail: 'ADMIN.ADMIN_PASSWORD_CHANGING_FAIL'
    }).subscribe(res => {
    });
  }

  /**
   * @author Nermeen Mattar
   * @description attemps to update the team name Using the httpPut function from httpRequestsSevrice.
   * @param {string} email
   */
  changeTeamName(teamName: string) {
    this.httpRequestService.httpPut('teams/' + this.userService.selectedTeam.teamId + '/change_team_name', {teamName: teamName},
     {
       success: 'ADMIN.TEAM_PASSWORD_CHANGING_SUCCESS',
       fail: 'ADMIN.TEAM_PASSWORD_CHANGING_FAIL'
     }).subscribe(res => {
     });
   }


  /**
   * @author Nermeen Mattar
   * @description attemps to update the team password Using the httpPut function from httpRequestsSevrice.
   * @param {any} oldAndNewPasswords
   */
  changeTeamPassword(oldAndNewPasswords) {
   this.httpRequestService.httpPut('teams/' + this.userService.selectedTeam.teamId + '/change_team_password', oldAndNewPasswords,
    {
      success: 'ADMIN.TEAM_PASSWORD_CHANGING_SUCCESS',
      fail: 'ADMIN.TEAM_PASSWORD_CHANGING_FAIL'
    }).subscribe(res => {
    });
  }

}
