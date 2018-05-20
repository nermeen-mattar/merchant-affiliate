import { first } from 'rxjs/operators';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { MatTableDataSource, MatDialog, MatDialogRef} from '@angular/material';

import { TcEvent } from '../../models/tc-event.model';
import { EventsService } from '../../services/events.service';
import { TcTeamInfo } from '../../../teams/models/tc-team-info.model';
import { UserService } from '../../../core/services/user.service';
import { ConfirmDialogComponent } from '../../../shared/components/confirm-dialog/confirm-dialog.component';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'tc-events-list',
  templateUrl: './events-list.component.html',
  styleUrls: ['./events-list.component.scss']
})

export class EventsListComponent implements OnInit {
  displayedColumns = ['id', 'date', 'time', 'event', 'status', 'actions']; //  'minCriticalValue', 'maxCriticalValue',
  eventsDataSource: MatTableDataSource < TcEvent > ;
  userTeams: TcTeamInfo[];
  selectedTeam: TcTeamInfo;
  teamMemberId: number;
  isPastEvents: boolean;
  displayAdminActions: boolean;
  filterString = '';
  isMobile: boolean;
  confirmDialogRef: MatDialogRef < ConfirmDialogComponent > ;
  timeFormat = {subString: { to: 5 }};
  activeEvent: TcEvent = null;
  constructor(
    private eventsService: EventsService,
    private userService: UserService,
    public dialog: MatDialog,
    private deviceService: DeviceDetectorService
  ) {
    this.isMobile = this.deviceService.isMobile();
    this.displayAdminActions = this.userService.getUserType().toLowerCase() === 'admin';
    this.userTeams = this.userService.getUserTeams();
    this.selectedTeam = this.userService.getSelectedTeam();
    this.updateEvents(this.isPastEvents);
  }

  ngOnInit() {}

  /**
   * @author Nermeen Mattar
   * @description updates the events variable by using events service to get events for the selected team then sends the
   * received events to initEventsDataSource function which initializes the eventsDataSource for the events table
   * @param {boolean} isPast
   */
  updateEvents(isPast: boolean) {
    this.isPastEvents = isPast;
    this.eventsDataSource = undefined; // reset data source to display the loader as new data will be received
    this.eventsService.getEvents(this.selectedTeam.teamId, isPast).subscribe(({
      events = [],
      myTeamMemberId
    }) => {
      this.teamMemberId = myTeamMemberId;
      this.addNumOfParticipationsToEvents(events);
      this.updateEventsDataSource(events);
    });
  }

  setActiveEvent(event: TcEvent) {
    this.activeEvent = event;
  }

  /**
   * @author Nermeen Mattar
   * @description When the user changes the selected team from the menu, it updates the selected team in user service with the newly
   * selected team, and updates the displayed events to displays the events that belongs to the selected team.
   */
  changeSelectedTeam() {
    this.userService.setSelectedTeam(this.selectedTeam);
    this.updateEvents(false);
  }

  /**
   * @author Nermeen Mattar
   * @description calculates the number of participations for each event and add it to the event object
   * @param {Event []} events
   */
  addNumOfParticipationsToEvents(events: TcEvent[]) {
    let numOfParitications;
    const eventsListLen = events.length;
    for (let eventIndex = 0; eventIndex < eventsListLen; eventIndex++) {
      numOfParitications = 0;
      const eventParticipations = events[eventIndex].detailedParticipations;
      if (eventParticipations) {
        const eventParticipationsLen = eventParticipations.length;
        for (let participationIndex = 0; participationIndex < eventParticipationsLen; participationIndex++) {
          if (eventParticipations[participationIndex].action === 'participate') {
            numOfParitications++;
          }
        }
      }
      events[eventIndex].numOfParticipations = numOfParitications;
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

  deleteEvent($event, eventId: string) {
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
