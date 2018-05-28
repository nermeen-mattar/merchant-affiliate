import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { format } from 'date-fns';

import { TeamsService } from './../../../core/services/teams.service';
import { FieldValidatorsService } from '../../../core/services/field-validators.service';
import { EventsService } from '../../services/events.service';
import { TcEvent } from '../../models/tc-event.model';
import { TcEventTypeValues } from '../../models/tc-event-type-values';

@Component({
  selector: 'tc-event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.scss']
})
export class EventFormComponent implements OnInit {
  selectedTeamId: number;
  eventGroup: FormGroup;
  displaySpinner = false;
  eventId: string; /* is undefined (in the case of event creation) */
  constructor(private eventsService: EventsService, teamsService: TeamsService, private fieldValidatorsService: FieldValidatorsService,
    private route: ActivatedRoute, private router: Router) {
      this.selectedTeamId = teamsService.selectedTeam.teamId;
      this.initFormEditingOrCreating();
  }

  ngOnInit() {}

  /**
   * @author Nermeen Mattar
   * @description checks the eventId param passed in the route to know if the user is trying to create a new event or edit an existing event
   * if the eventId param not equal to 'new', a request is sent to get the event with that Id.
   */
  initFormEditingOrCreating() {
    this.displaySpinner = true;
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
   * @param {TcEvent} eventValue
   */
  createEventForm(eventValue?: TcEvent ) {
    this.eventGroup = new FormGroup({
      eventName: new FormControl(eventValue ? eventValue.eventName : '', [Validators.required]),
      date: new FormControl(eventValue ? eventValue.date : '', [Validators.required]),
      eventTiming:  new FormGroup({
        startTime: new FormControl(eventValue ? eventValue.startTime : '', [Validators.required]),
        endTime: new FormControl(eventValue ? eventValue.endTime : '', [Validators.required])
      }, this.fieldValidatorsService.getValidator('validateSecondGreaterThanFirst', {field1: 'startTime', field2: 'endTime'})),
      location: new FormControl(eventValue ? eventValue.location : '', [Validators.required]),
      type: new FormControl(eventValue ? JSON.stringify(eventValue.type) : '0', [Validators.required]),
      eventCriticalValues:  new FormGroup({
        min: new FormControl(eventValue ? eventValue.minCriticalValue : '', [
          this.fieldValidatorsService.getValidator('validatePositive')
        ]),
        max: new FormControl(eventValue ? eventValue.maxCriticalValue : '', [
          this.fieldValidatorsService.getValidator('validatePositive')
        ])
      }, [ this.fieldValidatorsService.getValidator('validateSecondGreaterThanFirst', {field1: 'min', field2: 'max'})]),
      comment: new FormControl(eventValue ? eventValue.comment : '', [Validators.maxLength(600)]) // need to check the actual max
    });
    this.onEventTypeChange();
    this.displaySpinner = false;

  }

  /**
   * @author Nermeen Mattar
   * @description takes the user changes map properties to match the ones required by the backend then either updates or creates an event
   * and navigates back upon successfully saving the event.
   * @param {any} eventValue
   */
  save(eventValue) {
    const eventValueForBackend = this.getEventInBackendStructure(eventValue);
    eventValueForBackend.type = eventValueForBackend.type;
    if (this.eventId) {
      this.eventsService.updateEvent(this.eventId, this.selectedTeamId,
        eventValueForBackend).subscribe(res => {
        this.navigateBack();
      });
    } else {
      this.eventsService.createEvent(this.selectedTeamId, eventValueForBackend).subscribe(res => {
        this.navigateBack();
      });
    }
  }

  /**
   * @author Nermeen Mattar
   * @description disbales the max critical value field when the event type is cancelation
   */
  onEventTypeChange() {
    const maxFormControl = (<FormGroup> this.eventGroup.controls['eventCriticalValues']).controls['max'];
    switch (Number(this.eventGroup.controls.type.value)) {
      case TcEventTypeValues.CANCELATION:
      maxFormControl.setValue(null);
      maxFormControl.disable();
      break;
      case TcEventTypeValues.PARTICIPATION:
      maxFormControl.enable();
      break;
    }
  }

  /**
   * @author Nermeen Mattar
   * @description maps the properties in the received object to the structure required by the backend and formats the date.
   * @param {any} eventValue
   */
  getEventInBackendStructure(eventValue): TcEvent {
    const eventValueCopy: TcEvent = {
      eventName: eventValue.eventName,
      date: format(eventValue.date, 'YYYY-MM-DD'),
      startTime: eventValue.eventTiming.startTime,
      endTime: eventValue.eventTiming.endTime,
      minCriticalValue: eventValue.eventCriticalValues.min,
      maxCriticalValue: eventValue.eventCriticalValues.max,
      type: Number(eventValue.type),
      location: eventValue.location,
      comment: eventValue.comment
    };
    return eventValueCopy;
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
