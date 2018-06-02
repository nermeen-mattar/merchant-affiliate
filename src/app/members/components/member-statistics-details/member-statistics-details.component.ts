import { DateService } from './../../../core/services/date.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatTableDataSource, PageEvent} from '@angular/material';

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
  memberStatisticsDetailsDatasource: MatTableDataSource <any>;
  displayedColumns = ['date',  'eventName', 'time',   'status'];
  selectedPage: number;
  memberId: number;
  actionType: string;
  timeFormat = {subString: { to: 5 }}; /* need enhancing */
  member: string;
  email: string;
  constructor(private membersStatisticsService: MembersStatisticsService, private eventsService: EventsService, route: ActivatedRoute) {
    this.memberId = route.snapshot.params['memberId'];
    // console.log(' route.snapshot.params ',  route.snapshot.params['test']);
    this.updateMemberDetailsStatistics();
  }

  ngOnInit() {}


   /**
   * @author Nermeen Mattar
   * @description updates the members variable by using members service to get members for the selected team then sends
   * the received members to initMembersDataSource function which initializes the membersDataSource for the members table
   */
  updateMemberDetailsStatistics() {
    this.memberStatisticsDetailsDatasource = undefined; // reset data source to display the loader as new data will be received
    this.membersStatisticsService.getMemberStatisticsDetails('participate', this.memberId,
     ).subscribe(({
       dateFrom,
       dateTo,
       firstName,
       lastName,
       email,
      events = []
    }) => {
      this.email = email;
      this.member = firstName.concat(' ').concat(lastName);
      this.updateMembersStatisticsDetailsDataSource(events);
      this.eventsService.addNumOfParticipationsToEvents(events  );
    });
  }

  /**
   * @author Nermeen Mattar
   * @description creates a new object of type material table data source and passes to it the members data to be displayed on the table
   * @param {TcMember[]} members
   */
  updateMembersStatisticsDetailsDataSource(membersStatisticsDetails) { //  TcMemberStatistics[]
    // this.filterString = ''; // reset any string the user entered in the search input
    this.memberStatisticsDetailsDatasource = new MatTableDataSource(membersStatisticsDetails);
    // Assign the data to the data source for the table to render
  }

/**
 *
 *
 * @param {PageEvent} paginatorEvent
 * @memberof MemberStatisticsDetailsComponent
 */
getDataForSelectedPage(paginatorEvent: PageEvent) {
    this.selectedPage = paginatorEvent.pageIndex;
    this.updateMemberDetailsStatistics();
  }

  /**
   * @author Nermeen Mattar
   * @description filters the either the cancelation list or the participations list based on the passed parameter
   * table based on the user's input
   * @param {string} filterValue
   * @param {string} eventType
   */
  applyFilterToEventDetails(filterValue: string, eventType: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.memberStatisticsDetailsDatasource[eventType].filter = filterValue;
  }

}
