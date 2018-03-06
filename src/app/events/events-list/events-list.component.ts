import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { MatTableDataSource} from '@angular/material';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';

import { EventItem } from './../models/event-item.model';
import { EventsService } from './../services/events.service';
import { TeamInfo } from './../../teams/models/team-info.model';
import { UserService } from './../../core/services/user.service';

@Component({
  selector: 'tc-events-list',
  templateUrl: './events-list.component.html',
  styleUrls: ['./events-list.component.scss']
})

export class EventsListComponent implements OnInit {
  events: EventItem[] = [];
  displayedColumns = ['event-info', 'id', 'date', 'time', 'event', 'status', 'critical-value'];
  eventsDataSource: MatTableDataSource < EventItem > ;
  userTeams: TeamInfo[];
  selectedTeam: TeamInfo;
  teamMemberId: number;
  isPastEvents: boolean;
  displayAdminActions: boolean;
  filterString = '';

  constructor(private eventsService: EventsService, private userService: UserService, private router: Router) {
    this.displayAdminActions = this.userService.getUserType().toLowerCase() === 'admin';
    if (this.displayAdminActions) {
      this.displayedColumns.push('action');
    }
    this.userTeams = this.userService.getUserTeams();
    this.selectedTeam = this.userService.getSelectedTeam();
    this.updateEvents(this.isPastEvents);
  }

  ngOnInit() {}
  /**
   * @author Nermeen Mattar
   * @description updates the events variable by using events service to get events for the selected team then sends the received events to
   * initEventsDataSource function which initializes the eventsDataSource for the events table
   */
  updateEvents(isPast: boolean) {
    this.isPastEvents = isPast;
    this.eventsDataSource = undefined; // reset data source to display the loader as new data will be received
    this.userService.setSelectedTeam(this.selectedTeam); // *** temp (to enhance)
    this.eventsService.getEvents(this.selectedTeam.teamId, isPast).subscribe( ({events= [], myTeamMemberId}) => {
      this.teamMemberId = myTeamMemberId;
      this.events = events; // *** res contains myParts and other info!
      this.addNumOfParticipationsToEvents();
      this.updateEventsDataSource(this.events);
    });
  }
  /**
   * @author Nermeen Mattar
   * @description calculates the number of participations for each event and add it to the event object
   */
  addNumOfParticipationsToEvents() {
    let numOfParitications;
    const eventsListLen = this.events.length;
    for (let eventIndex = 0 ; eventIndex < eventsListLen ; eventIndex++) {
      numOfParitications = 0;
      const eventParticipations = this.events[eventIndex].detailedParticipations;
      const eventParticipationsLen = eventParticipations.length;
      for ( let participationIndex = 0 ; participationIndex < eventParticipationsLen; participationIndex++) {
        if (eventParticipations[participationIndex].action === 'participate') {
          numOfParitications++;
        }
      }
      this.events[eventIndex].numOfParticipations = numOfParitications;
    }
  }

  /**
   * @author Nermeen Mattar
   * @description toggles user participaion in the target event
   * @param {boolean} toggleValue
   * @param {string} eventId
   */
  toogleParticipationInEvent(toggleValue: boolean, eventId: string) {
    this.eventsService.toggleEventParticipation(toggleValue, eventId, this.teamMemberId).subscribe(res => {
      this.eventsDataSource.data[this.getIndexOfTargetEvent(eventId)].numOfParticipations += toggleValue ? 1 : -1;
      this.triggerTableToRefreshData();
    });
  }

  getIndexOfTargetEvent(eventId: string) {
    return this.eventsDataSource.data.findIndex(event => event.id === eventId);
  }

  triggerTableToRefreshData() {
    this.filterString = ''; // reset any string the user entered in the search input
    this.eventsDataSource.data = this.eventsDataSource.data; // to trigger the table to change its data.
  }
  /**
   * @author Nermeen Mattar
   * @description deletes the target event from the events list (only allowed for admin)
   * @param {string} eventId
   */
  deleteEvent(eventId: string) {
    this.eventsService.deleteEvent(eventId).subscribe( res => {
      this.eventsDataSource.data.splice(this.getIndexOfTargetEvent(eventId) , 1);
      this.triggerTableToRefreshData();
    });
  }

  /**
   * @author Nermeen Mattar
   * @description creates a new object of type material table data source and passes to it the events data to be displayed on the table
   * @param {EventItem[]} events
   */
  updateEventsDataSource(events: EventItem[]) {
    this.filterString = ''; // reset any string the user entered in the search input
    this.eventsDataSource = new MatTableDataSource(events); // Assign the data to the data source for the table to render
  }

  /**
   * @author Nermeen Mattar
   * @description filters the events list table based on the user's input
   * @param {string} filterValue
   */
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Removes whitespace
    filterValue = filterValue.toLowerCase(); // eventsDataSource defaults to lowercase matches
    this.eventsDataSource.filter = filterValue;
  }
}
