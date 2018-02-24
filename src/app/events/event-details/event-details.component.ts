import { MatTableDataSource } from '@angular/material';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { EventsService } from './../services/events.service';

@Component({
  selector: 'tc-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.scss']
})
export class EventDetailsComponent implements OnInit {
  absentDatasource: MatTableDataSource <any> ;
  presentDatasource: MatTableDataSource <any> ;
  displayedColumns = ['name', 'mail'];

  constructor(private eventsService: EventsService, route: ActivatedRoute) {
    this.eventsService.getEventDetails(route.snapshot.params['teamId']).subscribe (res => {
      this.initAbsentDataSource(res.absent);
      this.initPresentDataSource(res.present);
    });
   }

  ngOnInit() {
  }

  initAbsentDataSource(eventState) {
    this.absentDatasource = new MatTableDataSource(eventState); // Assign the data to the data source for the table to render
  }
  initPresentDataSource(eventState) {
    this.presentDatasource = new MatTableDataSource(eventState); // Assign the data to the data source for the table to render
  }

  /**
   * @author Nermeen Mattar
   * @description filters the participations list table based on the user's input
   * @param {string} filterValue
   */
  applyFilterToParticipations(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.presentDatasource.filter = filterValue;
  }
 /**
   * @author Nermeen Mattar
   * @description filters the cancelations list table based on the user's input
   * @param {string} filterValue
   */
  applyFilterToCancelations(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.absentDatasource.filter = filterValue;
  }

}
