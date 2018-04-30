import { MatTableDataSource } from '@angular/material';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { EventsService } from '../../services/events.service';

@Component({
  selector: 'tc-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.scss']
})
export class EventDetailsComponent implements OnInit {
  eventDetailsDatasource: {absent: MatTableDataSource<any>, present: MatTableDataSource<any>};
  displayedColumns = ['name', 'mail'];

  constructor(private eventsService: EventsService, route: ActivatedRoute) {
    this.eventsService.getEventDetails(route.snapshot.params['teamId']).subscribe (res => {
      this.initEventDetailsDataSource(res);
    });
   }

  ngOnInit() {
  }

  initEventDetailsDataSource(eventDetails) {
    this.eventDetailsDatasource = {
      absent: new MatTableDataSource(eventDetails.absent),
      present: new MatTableDataSource(eventDetails.present),
    };
  }

 /**
   * @author Nermeen Mattar
   * @description filters the either the cancelation list or the participations list based on the passed parameter
   * table based on the user's input
   * @param {string} filterValue
   * @param {string} eventType
   */
  applyFilterToEventDetails(filterValue: string, eventType: string) {
    debugger;
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.eventDetailsDatasource[eventType].filter = filterValue;
  }

}
