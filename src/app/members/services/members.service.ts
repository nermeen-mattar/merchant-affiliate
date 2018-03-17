import { Injectable } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

import { TcActivationStatusInfo } from './../models/tc-activation-status-info.model';
import { UserMessages } from './../../core/models/user-messages.model';
import { TcMember } from '../models/tc-member.model';
import { UserService } from './../../core/services/user.service';
import { HttpRequestsService } from './../../core/services/http-requests.service';

@Injectable()
export class MembersService {

  constructor(private httpRequestService: HttpRequestsService, private userService: UserService) {}

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
        success: 'MEMBER_DELETING_SUCCESS',
        fail: 'MEMBER_DELETING_FAIL'
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
    const changeStatusSuccessMessage = activationStatusInfo.flag ? 'MEMBER_ACTIVATE_SUCCESS' : 'MEMBER_DEACTIVATE_SUCCESS';
    return this.httpRequestService.httpPut(
      `teammembers`, activationStatusInfo, {
        success: changeStatusSuccessMessage,
        fail: 'CHANGING_MEMBER_ACTIVATION_STATUS_FAIL'
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
      `teammembers/${memberId}`,
      {
        fail: 'MEMBER_GETTING_FAIL'
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
        success: 'MEMBER_CREATING_SUCCESS',
        fail: 'MEMBER_CREATING_FAIL'
      });
  }

  /**
   * @author Nermeen Mattar
   * @description sends a get request to the server to update the member with the received id
   * @param {number} memberId
   * @param {number} teamId
   * @param {TcMember} member
   * @returns {Observable <any>}
   */
  updateMember(memberId: number, teamId: number, member: TcMember): Observable < any > {
    return this.httpRequestService.httpPut(
      `members/${memberId}`, member, {
        success: 'MEMBER_UPDATING_SUCCESS',
        fail: 'MEMBER_UPDATING_FAIL'
      });
  }
}
