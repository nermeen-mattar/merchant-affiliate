import { MatTableDataSource, MatSlideToggle } from '@angular/material';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { TcEventDetails } from './../../models/tc-event-details.model';
import { TcMember } from './../../../members/models/tc-member.model';
import { EventsService } from '../../services/events.service';
import { MembersService } from '../../../members/services/members.service';
import { TeamsService } from '../../../core/services/teams.service';
import { participation } from '../../constants/participation.constants';
@Component({
  selector: 'tc-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.scss']
})
export class EventDetailsComponent implements OnInit {
  eventDetailsDatasource: {
    absent: MatTableDataSource < any > ,
    present: MatTableDataSource < any >
  };
  displayedColumns = ['name', 'mail'];
  timeFormat = {
    subString: {
      to: 5
    }
  };
  eventDetails: TcEventDetails;
  selectedTeamId: number;
  isTeamAdmin: boolean;
  eventId: number;
  filterString: string;
  constructor(private eventsService: EventsService, private membersService: MembersService, private teamsService: TeamsService,
     route: ActivatedRoute) {
    this.selectedTeamId = this.teamsService.selectedTeamId;
    this.isTeamAdmin = this.teamsService.hasAdminRole(this.selectedTeamId);
    if (this.isTeamAdmin) {
      this.displayedColumns.unshift('toggeler');
    }
    this.eventId = route.snapshot.params['eventId'];
    this.eventsService.getEventDetails(this.eventId).subscribe((eventDetails: TcEventDetails) => {
      this.eventDetails = eventDetails;
      this.initEventDetailsDataSource(this.eventDetails.absent, this.eventDetails.present);
    });
  }

  ngOnInit() {}

  /**
   * @author Nermeen Mattar
   * @description creates a new object of type material table data source and passes to it the data for the cancelations and participations
   * @param {TcMember[]} cancelationsData
   * @param {TcMember[]} participationsData
   * @memberof EventDetailsComponent
   */
  initEventDetailsDataSource(cancelationsData: TcMember[], participationsData: TcMember[]) {
    this.eventDetailsDatasource = {
      absent: new MatTableDataSource(cancelationsData),
      present: new MatTableDataSource(participationsData),
    };
  }

  /**
   * @author Nermeen Mattar
   * @description filters the either the cancelation list and the participations list based on the passed parameter
   * table based on the user's input
   * @param {string} filterValue
   */
  applyFilterToEventDetails(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.eventDetailsDatasource[participation.absent].filter = filterValue;
    this.eventDetailsDatasource[participation.present].filter = filterValue;
  }


  /**
   * @author Nermeen Mattar
   * @description toggles the participaion of the target member
   * @param {boolean} toggleValue
   * @param {TcMember} toggledMember
   * @param {MatSlideToggle} currToggle
   */
  toggleMemberParticipation(toggleValue: boolean, toggledMember: TcMember, currToggle: MatSlideToggle) {
    const toggleSuccessMessage = toggleValue ? 'MEMBER.MEMBER_MOVED_TO_PARTICIPATION' : 'MEMBER.MEMBER_MOVED_TO_CANCELATION';
    this.eventsService.toggleEventParticipation(toggleValue, this.eventId , toggledMember.id, toggleSuccessMessage).subscribe(() => {
      const {toggleType, toggleInverseType} = toggleValue ?
      {toggleType: participation.absent, toggleInverseType: participation.present} :
      {toggleType:  participation.present, toggleInverseType: participation.absent};
      this.eventDetailsDatasource[toggleType].data = this.eventDetailsDatasource[toggleType].data.filter( member => {
        return member.id !== toggledMember.id;
      });
      this.eventDetailsDatasource[toggleInverseType].data.push(toggledMember);
      this.triggerTableToRefreshData();
    }, () => {
      currToggle.toggle();
    });
  }


  triggerTableToRefreshData() {
    this.filterString = ''; // reset any string the user entered in the search input
    this.initEventDetailsDataSource(this.eventDetailsDatasource.absent.data, this.eventDetailsDatasource.present.data);
  }
}
