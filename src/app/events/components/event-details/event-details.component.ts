import { MatTableDataSource } from '@angular/material';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { TcEventDetails } from './../../models/tc-event-details.model';
import { TcMember } from './../../../members/models/tc-member.model';
import { EventsService } from '../../services/events.service';
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
  constructor(private eventsService: EventsService, route: ActivatedRoute) {
    this.eventsService.getEventDetails(route.snapshot.params['teamId']).subscribe((eventDetails: TcEventDetails) => {
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
    this.eventDetailsDatasource['absent'].filter = filterValue;
    this.eventDetailsDatasource['present'].filter = filterValue;
  }

}
