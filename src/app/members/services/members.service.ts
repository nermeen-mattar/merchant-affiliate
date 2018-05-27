import { Injectable } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { Observable } from 'rxjs/internal/Observable';
import { BehaviorSubject } from 'rxjs';
import { TcActivationStatusInfo } from './../models/tc-activation-status-info.model';
import { UserMessages } from './../../core/models/user-messages.model';
import { TcMember } from '../models/tc-member.model';
import { HttpRequestsService } from './../../core/services/http-requests.service';

@Injectable()
export class MembersService {

  constructor(private httpRequestService: HttpRequestsService) {}

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
      `teammembers/${memberId}`,
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
   * @param {number} teamId
   * @param {TcMember} member
   * @returns {Observable <any>}
   */
  updateMember(memberId: number, teamId: number, member: TcMember): Observable < any > {
    return this.httpRequestService.httpPut(
      `members/${memberId}`, member, {
        success: 'MEMBER.MEMBER_UPDATING_SUCCESS',
        failDefault: 'MEMBER.MEMBER_UPDATING_FAIL'
      });
  }
}
