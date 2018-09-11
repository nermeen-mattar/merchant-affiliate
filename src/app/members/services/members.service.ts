import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

import { TcActivationStatusInfo } from './../models/tc-activation-status-info.model';
import { TcMember } from '../models/tc-member.model';
import { HttpRequestsService } from './../../core/services/http-requests.service';

@Injectable()
export class MembersService {

  constructor(private httpRequestService: HttpRequestsService) {}



  /**
   * @author Nermeen Mattar
   * @description Uses the httpRequestsSevrice to send a post request to the backend to check whether the received email belongs to an
   * already existed member. Note that an object of type UserMessages is being sent with an empty fail property to disable defulat error.
   * @param emailObj
   */
  isMemberExist(email: string): Observable < any > {
    return this.httpRequestService.httpPost('members/check', {
      email: email
    }, {
      fail: 'NO_ERROR_MESSAGE'
    });
  }

  /**
   * @author Nermeen Mattar
   * @description sends a get request to the server to get the list of members for a specific user and team
   * @param {number} teamId
   * @param {boolean} isPast
   * @returns {Observable < any >}
   */
  getMembers(teamId: number): Observable < any > { // Member[] there are other info!
    return this.httpRequestService.httpGet(
      `teammembers/byteamid/${teamId}`
    );
  }

  /**
   * @author Nermeen Mattar
   * @description sends a request to the server to delete a specific member
   * @param {number} memberId
   * @returns {Observable <any>}
   */
  deleteMember(memberId: number): Observable < any > {
    return this.httpRequestService.httpDelete(
      `teammembers/${memberId}`, {
        success: 'MEMBER.MEMBER_DELETING_SUCCESS',
        failDefault: 'MEMBER.MEMBER_DELETING_FAIL'
      });
  }

  /**
   * @author Nermeen Mattar
   * @description
   * @param {TcActivationStatusInfo} statusInfo
   * @returns
   * @memberof MembersService
   */
  changeMemberActivationStatus(activationStatusInfo: TcActivationStatusInfo) {
    const changeStatusSuccessMessage = activationStatusInfo.flag ? 'MEMBER.MEMBER_ACTIVATE_SUCCESS' : 'MEMBER.MEMBER_DEACTIVATE_SUCCESS';
    return this.httpRequestService.httpPut(
      `teammembers`, activationStatusInfo, {
        success: changeStatusSuccessMessage,
        failDefault: 'MEMBER.MEMBER_CHANGING_ACTIVATION_STATUS_FAIL'
      });
  }

  /** Following are functions needed for member form **/

  /**
   * @author Nermeen Mattar
   * @description sends a get request to the server to receive the member with the received id
   * @param {number} memberId
   * @returns {Observable <any>}
   */
  getMember(memberId: number): Observable < any > {
    return this.httpRequestService.httpGet(
      `members/${memberId}`, // teammembers
      {
        failDefault: 'MEMBER.MEMBER_GETTING_FAIL'
      });
  }

  /**
   * @author Nermeen Mattar
   * @description sends a post request to the server to create a new member
   * @param {teamId} number
   * @param {TcMember} member
   * @returns {Observable <any>}
   */
  createMember(teamId: number, member: TcMember): Observable < any > {
    return this.httpRequestService.httpPost(
      'members', {teamId: teamId, ...member}, {
        success: 'MEMBER.MEMBER_CREATING_SUCCESS',
        failDefault: 'MEMBER.MEMBER_CREATING_FAIL'
      });
  }

  /**
   * @author Nermeen Mattar
   * @description sends a get request to the server to update the member with the received id
   * @param {number} memberId
   * @param {TcMember} member
   * @returns {Observable <any>}
   */
  updateMember(memberId: number, member: TcMember): Observable < any > {
    return this.httpRequestService.httpPut(
      `members/${memberId}`, member, {
        success: 'MEMBER.MEMBER_UPDATING_SUCCESS',
        failDefault: 'MEMBER.MEMBER_UPDATING_FAIL'
      });
  }

  /**
   * @author Nermeen Mattar
   * @description sends the member's firstname, last name, password, and activation hash to the server 
   * to activate the member in the first login
   * @returns {Observable <any>}
   */
  activateMember(memberAtivationInfo) : Observable < any > {
    return this.httpRequestService.httpPut('activation/member', memberAtivationInfo);
  }

  /**
   * @author Nermeen Mattar
   * @description attemps to update the member password Using the httpPut function from httpRequestsSevrice.
   * @param {any} oldAndNewPasswords
   */
  changePassword(oldAndNewPasswords):Observable <any> {
    return this.httpRequestService.httpPut('members/change_password',oldAndNewPasswords, {
      // {username:'nermeenmattar@hotmail.com' ,...
      success: 'MEMBER.MEMBER_PASSWORD_CHANGING_SUCCESS',
      failDefault: 'MEMBER.MEMBER_PASSWORD_CHANGING_FAIL'
    });
  }


  /**
   * @author Nermeen Mattar
   * @description sets the teams' reminders for logged in user
   * @param {any} teamsReminders
   */
  setReminders(teamsReminders){
    return this.httpRequestService.httpPut('members/reminders', teamsReminders,  {
      fail: 'NO_ERROR_MESSAGE'
    }).subscribe(res => res);
  }

  /**
   * @author Nermeen Mattar
   * @description gets the list of teams' reminders for logged in user
   */
  getReminders():Observable <any> {
    return this.httpRequestService.httpGet('members/reminders', {
      fail: 'NO_ERROR_MESSAGE'
    });
  }

  /**
   * @author Nermeen Mattar
   * @description attemps to delete the account of the logged in user.
   */
  deleteMyAccount() {
    this.httpRequestService.httpDelete('members', {
      success: 'USER.USER_DELETING_SUCCESS',
      failDefault: 'USER.USER_DELETING_FAIL'
    }).subscribe(res => {});
  }
}
