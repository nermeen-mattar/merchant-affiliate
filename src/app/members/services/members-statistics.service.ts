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
   * @description sends a get request to the server to get the list of members for a specific user and team
   * @param {number} teamId
   * @param {boolean} isPast
   * @returns {Observable < any >}
   */
  getMembersStatistics(teamId: number): Observable < any > { // Member[] there are other info!
    return this.httpRequestService.httpPost(
      `statistics/byteam/`, {
        ...this.dateService.selectedDateRange,
        teamId: teamId
      }
    );
  }


  /**
   * @author Nermeen Mattar
   * @description sends a get request to the server to get the list of members for a specific user and team
   * @param {number} teamId
   * @param {boolean} isPast
   * @returns {Observable < any >}
   */
  getMemberStatisticsDetails(action: string, memberId: number): Observable < any > {
    return this.httpRequestService.httpPost(
      `statistics/perteammember/`, {
        action: action,
        ...this.dateService.selectedDateRange,
        teamId: this.teamsService.selectedTeamId,
        teamMemberId: memberId,
        page: 1,
        size: 1,
      }
    );
  }
  /*
  {
  "action": "participate",
  "dateFrom": "2018-05-20",
  "dateTo": "2018-05-20",
  "page": 0,
  "size": 0,
  "teamId": 0,
  "teamMemberId": 0
}*/
}
