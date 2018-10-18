import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatTableDataSource, PageEvent} from '@angular/material';

import { TcEvent } from './../../../events/models/tc-event.model';
import { TcDateRane } from './../../../shared/models/tc-date-range.model';
import { DateService } from './../../../core/services/date.service';
import { EventsService } from './../../../events/services/events.service';
import { MembersStatisticsService } from './../../services/members-statistics.service';
import { TcDateRange } from '../../../core/models/tc-date-range.model';

@Component({
  selector: 'tc-member-statistics-details',
  templateUrl: './member-statistics-details.component.html',
  styleUrls: ['./member-statistics-details.component.scss'],
  providers: [MembersStatisticsService, EventsService]
})

export class MemberStatisticsDetailsComponent implements OnInit {
  memberStatisticsDetailsDatasource: MatTableDataSource < any > ;
  displayedColumns = ['date', 'eventName', 'time', 'status'];
  selectedPage = 1;
  pageSize = 20; /* enhance and move to a unified place */
  memberId: number;
  actionType: string;
  timeFormat = {
    subString: {
      to: 5
    }
  }; /* need enhancing */
  member: string;
  email: string;
  dateRange: TcDateRange;
  numberOfRecords: number;
  constructor(private membersStatisticsService: MembersStatisticsService, private eventsService: EventsService, route: ActivatedRoute,
    dateService: DateService) {
    this.memberId = route.snapshot.params['memberId'];
    this.actionType = route.snapshot.params['action-type'];
    this.dateRange = dateService.selectedDateRange;
    if (this.memberId && this.dateRange) {
      this.updateMemberDetailsStatistics();
    }
    /* add else route to 404 page */
  }

  ngOnInit() {}

  /**
   * @author Nermeen Mattar
   * @description updates the members variable by using members service to get members for the selected team then sends
   * the received members to initMembersDataSource function which initializes the membersDataSource for the members table
   */
  updateMemberDetailsStatistics() {
    this.memberStatisticsDetailsDatasource = undefined; // reset data source to display the loader as new data will be received
    this.membersStatisticsService.getMemberStatisticsDetails(this.actionType, this.memberId, this.selectedPage, this.pageSize).subscribe(({
      dateFrom,
      dateTo,
      firstName,
      lastName,
      totalCount,
      email,
      events = []
    }) => {
      this.email = email;
      this.numberOfRecords = totalCount;
      this.member = firstName.concat(' ').concat(lastName);
      this.updateMembersStatisticsDetailsDataSource(events);
      this.eventsService.addNumOfParticipationsToEvents(events);
    });
  }

  /**
   * @author Nermeen Mattar
   * @description creates a new object of type material table data source and passes to it the data for the member events
   * @param {TcEvent[]} events
   */
  updateMembersStatisticsDetailsDataSource(events: TcEvent[]) {
    this.memberStatisticsDetailsDatasource = new MatTableDataSource(events);
  }

  /**
   *
   * @author Nermeen Mattar
   * @description called when the user attempts to open a new page. It updates the selected page and calls the update member details
   * function
   * @param {PageEvent} paginatorEvent
   */
  getDataForSelectedPage(paginatorEvent: PageEvent) {
    this.selectedPage = paginatorEvent.pageIndex;
    this.updateMemberDetailsStatistics();
  }

}
