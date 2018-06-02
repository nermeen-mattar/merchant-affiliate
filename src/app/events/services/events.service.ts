import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { BehaviorSubject } from 'rxjs';
import { UserMessages } from './../../core/models/user-messages.model';
import { TcEvent } from '../models/tc-event.model';
import { UserService } from './../../core/services/user.service';
import { HttpRequestsService } from './../../core/services/http-requests.service';
@Injectable()
export class EventsService {

  constructor(private httpRequestService: HttpRequestsService, private userService: UserService) {}
  currentEvent: Event;

  /**
   * @author Nermeen Mattar
   * @description sends a get request to the server to get the list of events for a specific user and team
   * @param {number} teamId
   * @param {boolean} isPast
   * @returns {Observable < any >}
   */
  getEvents(teamId: number, isPast: boolean): Observable < any > { // TcEvent [] there are other info!
    const endPoint = isPast ? 'pastsbyteamid' : 'byteamid';
    return this.httpRequestService.httpPost(
      `events/${endPoint}/${teamId}`,
      this.userService.username
    );
  }

  /**
   * @author Nermeen Mattar
   * @description sends a get request to the server to receive the details for the chosen event
   * @param {string} eventId
   * @returns {Observable <any>}
   */
  getEventDetails(eventId: string): Observable < any > {
    return this.httpRequestService.httpGet(
      `eventstate/${eventId}`);
  }

  /**
   * @author Nermeen Mattar
   * @description sends a request to the server to change the user's participation status for a specific event
   * @param {boolean} isParticipated
   * @param {string} eventId
   * @param {number} teamMemberId
   * @returns {Observable < any >}
   */
  toggleEventParticipation(isParticipated: boolean, eventId: string, teamMemberId: number): Observable < any > {
    const participationText = isParticipated ? 'participate' : 'cancel';
    const toggleSuccessMessage = isParticipated ? 'EVENT.EVENT_PARTICIPATION_CONFIRMED' : 'EVENT.EVENT_CANCELATION_CONFIRMED';
    return this.httpRequestService.httpPut(
      'particips', {
        eventId: eventId,
        participationText: participationText,
        teamMemberId: teamMemberId
      }, {
        success: toggleSuccessMessage,
        failDefault: 'EVENT.EVENT_CHANGING_PARTICIPATION_FAIL'
      });
  }

  /**
   * @author Nermeen Mattar
   * @description sends a request to the server to delete a specific event
   * @param {string} eventId
   * @returns {Observable <any>}
   */
  deleteEvent(eventId: string): Observable < any > {
    return this.httpRequestService.httpDelete(
      `events/${eventId}`, {
        success: 'EVENT.EVENT_DELETING_SUCCESS',
        failDefault: 'EVENT.EVENT_DELETING_FAIL'
      });
  }

  /** Following are functions needed for event form **/

  /**
   * @author Nermeen Mattar
   * @description sends a get request to the server to receive the event with the received id
   * @param {string} eventId
   * @returns {Observable <any>}
   */
  getEvent(eventId: string): Observable < any > {
    return this.httpRequestService.httpGet(
      `events/${eventId}`, {
        failDefault: 'EVENT.EVENT_GETTING_FAIL'
      });
  }

  /**
   * @author Nermeen Mattar
   * @description sends a post request to the server to create a new event
   * @param {teamId} number
   * @param {TcEvent } event
   * @returns {Observable <any>}
   */
  createEvent(teamId: number, event: TcEvent ): Observable < any > { // Event [] there are other info!
    return this.httpRequestService.httpPost(
      'events', {teamId: teamId, ...event}, {
        success: 'EVENT.EVENT_CREATING_SUCCESS',
        failDefault: 'EVENT.EVENT_CREATING_FAIL'
      });
  }

  /**
   * @author Nermeen Mattar
   *  @description sends a get request to the server to update the event with the received id
   * @param {string} eventId
   * @param {number} teamId
   * @param {TcEvent } event
   * @returns {Observable <any>}
   */
  updateEvent(eventId: string, teamId: number, event: TcEvent ): Observable < any > {
    return this.httpRequestService.httpPut(
      `events/${eventId}`, event, {
        success: 'EVENT.EVENT_UPDATING_SUCCESS',
        failDefault: 'EVENT.EVENT_UPDATING_FAIL'
      });
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
}
