import { Injectable } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

import { DateService } from './../../core/services/date.service';
import { TeamsService } from './../../core/services/teams.service';
import { TcActivationStatusInfo } from './../models/tc-activation-status-info.model';
import { UserMessages } from './../../core/models/user-messages.model';
import { TcMember } from '../models/tc-member.model';
import { HttpRequestsService } from './../../core/services/http-requests.service';

@Injectable()
export class MembersStatisticsService {
  constructor(private httpRequestService: HttpRequestsService, private teamsService: TeamsService,
    private dateService: DateService) {}

  /**
   * @author Nermeen Mattar
   * @description sends the statistics list for members of a specific team in a specific date range
   * @param {number} teamId
   * @returns {Observable < any >}
   */
  getMembersStatistics(teamId: number): Observable < any > {
    return this.httpRequestService.httpPost(
      `statistics/byteam/`, {
        ...this.dateService.selectedDateRange,
        teamId: teamId
      }
    );
  }


  /**
   * @author Nermeen Mattar
   * @description gets the statistics details for a member of a specific team in a specific date range
   * @param {number} teamId
   * @param {number} memberId
   * @param {number} pageNumber
   * @param {number} pageSize
   * @returns {Observable < any >}
   */
  getMemberStatisticsDetails(action: string, memberId: number, pageNumber: number, pageSize: number): Observable < any > {
    return this.httpRequestService.httpPost(
      `statistics/perteammember/`, {
        action: action,
        ...this.dateService.selectedDateRange,
        teamId: this.teamsService.selectedTeamId,
        teamMemberId: memberId,
        page: pageNumber,
        size: pageSize,
      }
    );
  }
}
