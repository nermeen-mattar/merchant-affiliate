import { first } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatDialog, MatDialogRef, MatSlideToggle} from '@angular/material';

import { UserService } from './../../../core/services/user.service';
import { TeamsService } from './../../../core/services/teams.service';
import { TcEvent } from '../../models/tc-event.model';
import { EventsService } from '../../services/events.service';
import { TcTeamInfo } from '../../../teams/models/tc-team-info.model';
import { ConfirmDialogComponent } from '../../../shared/components/confirm-dialog/confirm-dialog.component';
import { roles } from '../../../core/constants/roles.constants';
@Component({
  selector: 'tc-events-list',
  templateUrl: './events-list.component.html',
  styleUrls: ['./events-list.component.scss']
})

export class EventsListComponent implements OnInit {
  columnsToDisplay = ['toggeler', 'date', 'time', 'event', 'status', 'user-action'];
  eventsDataSource: MatTableDataSource < TcEvent > ;
  userTeams: TcTeamInfo[];
  selectedTeamId: number;
  teamMemberId: number;
  isPastEvents: boolean;
  filterString = '';
  isLoggedInAsAdmin: boolean;
  isTeamAdmin: boolean;
  isTeamMember: boolean;
  confirmDialogRef: MatDialogRef < ConfirmDialogComponent > ;
  timeFormat = {
    subString: {
      to: 5
    }
  };
  activeEvent: TcEvent = null;
  constructor(
    private eventsService: EventsService,
    private teamsService: TeamsService,
    userService: UserService,
    public dialog: MatDialog
  ) {
    this.userTeams = this.teamsService.userTeams;
    this.isTeamMember = this.teamsService.hasMemberRole(this.selectedTeamId);
    this.isTeamAdmin = this.teamsService.hasAdminRole(this.selectedTeamId);
    this.selectedTeamId = this.teamsService.selectedTeamId;
    this.isLoggedInAsAdmin =  userService.userType === roles.admin;
    this.changeColumnsToDisplay();
    this.updateEvents();
  }

  ngOnInit() {}

  /**
   * @author Nermeen Mattar
   * @description updates the events variable by using events service to get events for the selected team then sends the
   * received events to initEventsDataSource function which initializes the eventsDataSource for the events table
   * @param {boolean} isPast
   */
  updateEvents() {
    this.eventsDataSource = undefined; // reset data source to display the loader as new data will be received
    this.eventsService.getEvents(this.selectedTeamId, this.isPastEvents).subscribe(({
      events = [],
      myTeamMemberId
    }) => {
      this.teamMemberId = myTeamMemberId;
      this.eventsService.addNumOfParticipationsToEvents(events);
      this.updateEventsDataSource(events);
    });
  }

  /**
   * @author Tobias Trusch
   * @description Helper function. converts time "hh:mm:ss" to date object
   */
  toDateWithOutTimeZone(time) {
    let tempTime = time.split(":");
    let dt = new Date();
    dt.setHours(tempTime[0]);
    dt.setMinutes(tempTime[1]);
    dt.setSeconds(tempTime[2]);
    return dt;
  }

  /**
   * @author Tobias Trusch
   * @description Checks each event if it's already in the past. If so, disables the toggle button
   * reason: we are displaying all events from today, regardles of time. until we fixed this on the backend, we shold disable on the frontend to manipulate past events,
   */
  isPastEvent(date, time){
    let eventDate = new Date(date)
    let eventTime = this.toDateWithOutTimeZone(time)
    eventDate.setHours(eventTime.getHours())
    eventDate.setMinutes(eventTime.getMinutes())
    eventDate.setSeconds(eventTime.getSeconds())
    if (new Date().getTime() > eventDate.getTime()){
      return true
    }
    return false
  }

  setActiveEvent(event: TcEvent) {
    this.activeEvent = event;
  }

  /**
   * @author Nermeen Mattar
   * @description Updates the displayed events to displays the past events.
   */
  displayPastEvents() {
    this.isPastEvents = true;
    this.updateEvents();
  }

  /**
   * @author Nermeen Mattar
   * @description Updates the displayed events to displays the future events.
   */
  displayFutureEvents() {
    this.isPastEvents = false;
    this.updateEvents();
  }

  /**
   * @author Nermeen Mattar
   * @description When the user changes the selected team from the menu, it updates the selected team in teamsService with the newly
   * selected team, and updates the displayed events to displays the events that belongs to the selected team.
   */
  changeSelectedTeam() {
    this.teamsService.selectedTeamId = this.selectedTeamId;
    this.changeColumnsToDisplay();
    this.updateEvents();
  }

  /**
   * @author Nermeen Mattar
   * @description this function is called during the initialization and each time the user changes the selected team.
   * Admin actions will be displayed if the user is 1) logged in as admin 2) an admin of the currently selected team.
   * Toggeler will be displayed if the user is 1) a member of the currently selected team.
   */
  changeColumnsToDisplay() {
    if (this.isLoggedInAsAdmin) {
      this.pushAdminActionIfTeamAdmin();
    }
    this.pushToggelerIfTeamMember();
  }

  /**
   * @author Nermeen Mattar
   * @description pushes admin actions column (which includes the edit and delete actions) if the user is an admin of the selected team and
   * admin-actions columns is not already displayed
   */
  pushAdminActionIfTeamAdmin() {
    this.isTeamAdmin = this.teamsService.hasAdminRole(this.selectedTeamId);
    if (this.isTeamAdmin && this.columnsToDisplay.indexOf('admin-actions') === -1) {
      this.columnsToDisplay.push('admin-actions');
    } else if (!this.isTeamAdmin && this.columnsToDisplay.indexOf('admin-actions') !== -1) {
      this.columnsToDisplay.pop();
    }
  }

  /**
   * @author Nermeen Mattar
   * @description pushes the event toggeler action column if the user is a member of the selected team and toggeler is not already displayed
   */
  pushToggelerIfTeamMember() {
    this.isTeamMember = this.teamsService.hasMemberRole(this.selectedTeamId);
    if (this.isTeamMember && this.columnsToDisplay.indexOf('toggeler') === -1) {
      this.columnsToDisplay.unshift('toggeler');
    } else if (!this.isTeamMember && this.columnsToDisplay.indexOf('toggeler') !== -1) {
      this.columnsToDisplay.shift();
    }
  }

  /**
   * @author Nermeen Mattar
   * @description toggles user participaion in the target event
   * @param {boolean} toggleValue
   * @param {string} eventId
   */
  toggleParticipationInEvent(toggleValue: boolean, eventId: string, currToggle: MatSlideToggle) {
    this.eventsService.toggleEventParticipation(toggleValue, eventId, this.teamMemberId).subscribe(res => {
      const event = this.eventsDataSource.data[this.getIndexOfTargetEvent(eventId)];
      event.numOfParticipations += toggleValue ? 1 : -1;
      event.myParticipation.action =  toggleValue ? 'participate' : 'cancel';
      this.triggerTableToRefreshData();
    }, err => {
      currToggle.toggle();
    });
  }

  preventTriggeringAccordion($event) {
    $event.stopPropagation();
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
    this.openConfirmationDialog();
    this.confirmDialogRef.afterClosed().pipe(
      first()
    ).subscribe(confirmed => {
      if (confirmed) {
        this.eventsService.deleteEvent(eventId).subscribe(res => {
          this.eventsDataSource.data.splice(this.getIndexOfTargetEvent(eventId), 1);
          this.triggerTableToRefreshData();
        });
      }
    });
  }

  openConfirmationDialog(): void {
    this.confirmDialogRef = this.dialog.open(ConfirmDialogComponent, {
      autoFocus: true,
      data: {
        dialogTitle: 'USER_MESSAGES.EVENT.EVENT_CONFIRM_DELETING_HEADER',
        dialogMessage: 'USER_MESSAGES.EVENT.EVENT_CONFIRM_DELETING_BODY'
      }
    });
  }

  /**
   * @author Nermeen Mattar
   * @description creates a new object of type material table data source and passes to it the events data to be displayed on the table
   * @param {Event []} events
   */
  updateEventsDataSource(events: TcEvent[]) {
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
