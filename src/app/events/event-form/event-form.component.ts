import { UserService } from './../../core/services/user.service';
import { EventsService } from './../services/events.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { EventItem } from '../models/event-item.model';

@Component({
  selector: 'tc-event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.scss']
})
export class EventFormComponent implements OnInit {
  selectedTeam: number;
  eventForm: FormGroup;
  eventId: string; /* is undefined (in the case of event creation) */
  constructor(private fb: FormBuilder, route: ActivatedRoute, private eventsService: EventsService, userService: UserService) {
    const eventIdVariable = route.snapshot.params['eventId'];
    if (eventIdVariable !== 'new') {
      this.eventId = eventIdVariable;
      this.eventsService.getEvent(this.eventId).subscribe(res => {
        this.createEventForm(res);
      } );
    } else {
      this.createEventForm();
    }
    this.selectedTeam = userService.getSelectedTeam();
  }

  ngOnInit() {}

  createEventForm(eventValue?: EventItem) {
    this.eventForm = this.fb.group({
      eventName:  new FormControl([ eventValue ? eventValue.eventName : '', Validators.required ]),
      date:  new FormControl([ eventValue ? eventValue.date : '', Validators.required ]),
      startTime:  new FormControl([ eventValue ? eventValue.startTime : '', Validators.required ]),
      endTime:  new FormControl([ eventValue ? eventValue.endTime : '', Validators.required ]),
      location:  new FormControl([ eventValue ? eventValue.location : '', Validators.required ]),
      type:  new FormControl([ eventValue ? eventValue.type : '0', Validators.required ]),
      criticalValue:  new FormControl([ eventValue ? eventValue.criticalValue : '', Validators.required ]),
      comment:  new FormControl([ eventValue ? eventValue.comment : '', Validators.maxLength(600) ] // need to check the actual max
    });
  }

  save(eventFormValue: EventItem) {
    console.log('eventFormValue ', eventFormValue);
    eventFormValue.date = eventFormValue.date.toLocaleString().replace(/\//g, '.').slice(0, 9);
    eventFormValue.type = eventFormValue.type;
    if (this.eventId) {
      this.eventsService.updateEvent(this.eventId, {teamId: this.selectedTeam, ...eventFormValue}).subscribe(res => {
        console.log(res);
      });
    } else {
      this.eventsService.createEvent({teamId: this.selectedTeam, ...eventFormValue}).subscribe(res => {
        console.log(res);
      });
    }
  }
}

/* this comment will be removed
  {
          eventName: "Nermeen test2",
          date: "29.03.2018",
          startTime: "14:22",
          endTime: "17:55",
          location: "location",
          type: "0",
          criticalValue: 10,
          comment: "comment",
          teamId: "65"
        }
*/
