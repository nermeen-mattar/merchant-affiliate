import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';

import { EventItem } from './../models/event-item.model';
import { EventsService } from './../services/events.service';
@Component({
  selector: 'tc-events-list',
  templateUrl: './events-list.component.html',
  styleUrls: ['./events-list.component.scss']
})

export class EventsListComponent implements OnInit {
  events: EventItem[];
  displayedColumns = ['id', 'type', 'date', 'time', 'event', 'status', 'critical-value'];
  dataSource: MatTableDataSource<EventItem>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private eventsService: EventsService) {
      this.eventsService.getEvents().subscribe( res => {
        this.events = res.events; // *** res contains myParts and other info!
        this.initDataSource(this.events);
      });
  }
  ngOnInit() {}

  /**
   * @author Nermeen Mattar
   * @description created a new object of type material table data source and passes to it the events data to be displayed on the table
   * also sets the paginator and sorting to enable them on the table.
   * @param {EventItem[]} events
   */
  initDataSource(events: EventItem[]) {
    // transform events
    this.dataSource = new MatTableDataSource(events); // Assign the data to the data source for the table to render
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  /**
   * @author Nermeen Mattar
   * @description filters the events list table based on the user's input
   * @param {string} filterValue
   */
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
}

