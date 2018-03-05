import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { format } from 'date-fns';

import { FieldValidatorsService } from './../../core/services/field-validators.service';
import { UserService } from './../../core/services/user.service';
import { EventsService } from './../services/events.service';
import { EventItem } from '../models/event-item.model';

@Component({
  selector: 'tc-event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.scss']
})
export class EventFormComponent implements OnInit {
  selectedTeamId: number;
  eventGroup: FormGroup;
  eventId: string; /* is undefined (in the case of event creation) */
  constructor(private eventsService: EventsService, userService: UserService, private fieldValidatorsService: FieldValidatorsService,
    private route: ActivatedRoute, private router: Router) {
      this.selectedTeamId = userService.getSelectedTeam().teamId;
      this.initFormEditingOrCreating();
  }

  ngOnInit() {}

  /**
   * @author Nermeen Mattar
   * @description checks the eventId param passed in the route to know if the user is trying to create a new event or edit an existing event
   * if the eventId param not equal to 'new', a request is sent to get the event with that Id.
   */
  initFormEditingOrCreating() {
    const eventIdVariable = this.route.snapshot.params['eventId'];
    if (eventIdVariable !== 'new') {
      this.eventId = eventIdVariable;
      this.leavePageIfWrongId();
      this.eventsService.getEvent(this.eventId).subscribe(res => {
        this.createEventForm(res);
      });
    } else {
      this.createEventForm();
    }
  }

  /**
   * @author Nermeen Mattar
   * @description navigates back if the id passed in the route does not include numbers (wrong id)
   */
  leavePageIfWrongId() {
    if (this.eventId && this.eventId.match(/[1-9]/g) === null) {
      this.navigateBack();
    }
  }

  /**
   * @author Nermeen Mattar
   * @description creates the event's form groups along with their form controls. With each created form control two things are passed;
   * First the field's value which is in the recevied parameter in the case of editing, and default value in the case of creating.
   * @param {EventItem} eventValue
   */
  createEventForm(eventValue ? : EventItem) {
    this.eventGroup = new FormGroup({
      eventName: new FormControl(eventValue ? eventValue.eventName : '', [Validators.required]),
      date: new FormControl(eventValue ? eventValue.date : '', [Validators.required]),
      eventTiming:  new FormGroup({
        startTime: new FormControl(eventValue ? eventValue.startTime : '', [Validators.required]),
        endTime: new FormControl(eventValue ? eventValue.endTime : '', [Validators.required])
      }, this.fieldValidatorsService.getValidator('checkIfEndAfterStart')),
      location: new FormControl(eventValue ? eventValue.location : '', [Validators.required]),
      type: new FormControl(eventValue ? JSON.stringify(eventValue.type) : '0', [Validators.required]),
      criticalValue: new FormControl(eventValue ? eventValue.criticalValue : '', [Validators.required]),
      comment: new FormControl(eventValue ? eventValue.comment : '', [Validators.maxLength(600)]) // need to check the actual max
    });
  }

  /**
   * @author Nermeen Mattar
   * @description takes the user changes map properties to match the ones required by the backend then either updates or creates an event
   * and navigates back upon successfully saving the event.
   * @param {any} eventValue
   */
  save(eventValue) { // EventItem
    const eventGroupValueCopy = this.getEventInBackendStructure(eventValue);
    eventGroupValueCopy.type = eventGroupValueCopy.type;
    if (this.eventId) {
      this.eventsService.updateEvent(this.eventId, this.selectedTeamId,
        eventGroupValueCopy).subscribe(res => {
        this.navigateBack();
      });
    } else {
      this.eventsService.createEvent(this.selectedTeamId, eventGroupValueCopy).subscribe(res => {
        this.navigateBack();
      });
    }
  }

  /**
   * @author Nermeen Mattar
   * @description maps the properties in the received object to the structure required by the backend and formats the date.
   * @param {any} eventValue
   */
  getEventInBackendStructure(eventValue): EventItem {
    const eventGroupValueCopy: EventItem = {
      eventName: eventValue.eventName,
      date: format(eventValue.date, 'DD.MM.YYYY'),
      startTime: eventValue.eventTiming.startTime,
      endTime: eventValue.eventTiming.endTime,
      criticalValue: eventValue.criticalValue,
      type: Number(eventValue.type),
      location: eventValue.location,
      comment: eventValue.comment
    };
    return eventGroupValueCopy;
  }

  /**
   * @author Nermeen Mattar
   * @description navigates to the page the user was previously in.
   */
  navigateBack() {
    this.router.navigate(['../'], {
      relativeTo: this.route
    });
  }
}
