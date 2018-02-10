import { EventData } from './../shared/event.model';
import { Observable } from 'rxjs/Observable';
import { EventsService } from './../shared/events.service';
import { HttpRequestsService } from './../../core/services/http-requests.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
@Component({
  selector: 'tc-events-list',
  templateUrl: './events-list.component.html',
  styleUrls: ['./events-list.component.scss']
})


/**
 * @author Nermeen Mattar
 * @description
 * @export
 * @class EventsListComponent
 * @implements {OnInit}
 * @ToDo:
 * 1- create user service (or team service) after understanding the business logic
 * 2- add types (classes)
 * 3- fix pagination
 * 4- add error/confirm messages (a branch by itself)
 */

export class EventsListComponent implements OnInit{
  $eventsList: Observable<object>;
  displayedColumns = ['id', 'type', 'date', 'time', 'event', 'status', 'critical-value'];
  dataSource: MatTableDataSource<EventData>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private httpRequestService: HttpRequestsService, private eventsService: EventsService) {
    const users: EventData[] = [];
      const currTeamId = 55; // hard coded until I implement the drop down menu for teams.
      this.httpRequestService.httpPost('events/byteamid/' + currTeamId, localStorage.getItem('username')).subscribe((res) => {
        console.log(res);
        this.initDataSource(res.events);
      });
  }
  ngOnInit() {
  }
  getEventsList() {
  //  this.$eventsList = this.eventsService.getEvents();
  }
  /**
   * Set the paginator and sort after getting events since this component will
   * be able to query its view for the initialized paginator and sort.
   */
  initDataSource(events) { // add typing
    // transform events
    this.dataSource = new MatTableDataSource(events); // Assign the data to the data source for the table to render
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
}

