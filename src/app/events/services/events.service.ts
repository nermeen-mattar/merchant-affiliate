import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

import { UserMessages } from './../../core/models/user-messages.model';
import { EventItem } from '../models/event-item.model';
import { UserService } from './../../core/services/user.service';
import { HttpRequestsService } from './../../core/services/http-requests.service';

@Injectable()
export class EventsService {

  constructor(private httpRequestService: HttpRequestsService, private userService: UserService) {}

  /**
   * @author Nermeen Mattar
   * @description sends a get request to the server to get the list of events for a specific user and team
   * @returns {Observable <any>}
   */
  getEvents(teamId: number, isPast: boolean): Observable < any > { // EventItem[] there are other info!
    const endPoint = isPast ? 'pastsbyteamid' : 'byteamid';
    return this.httpRequestService.httpPost(
      `events/${endPoint}/${teamId}`,
      this.userService.username
    );
  }

  /**
   * @author Nermeen Mattar
   * @description sends a get request to the server to receive the details for the chosen event
   * @returns {Observable <any>}
   */
  getEventDetails (eventId) {
    return this.httpRequestService.httpGet(
      `eventstate/${eventId}`);
  }

  /**
   * @author Nermeen Mattar
   * @description sends a post request to the server to create a new event
   * @returns {Observable <any>}
   */
  createEvent(event): Observable < any > { // EventItem[] there are other info!
    return this.httpRequestService.httpPost(
      `events`, event);
  }

  /**
   * @author Nermeen Mattar
   * @description sends a request to the server to change the user's participation status for a specific event
   * @returns {Observable <any>}
   */
  toggleEventParticipation(isParticipated, eventId, teamMemberId):  Observable <any> {
    const participationText = isParticipated ? 'participate' : 'cancel';
    const userMessage = isParticipated ? 'EVENT.PARTICIPATION_CONFIRMED' : 'EVENT.CANCELATION_CONFIRMED';
    return this.httpRequestService.httpPut(
      'particips', {
        eventId: eventId,
        participationText: participationText,
        teamMemberId: teamMemberId
      }, {
        success: userMessage,
        fail: 'EVENT.ERROR_CHANGING_PARTICIPATION'
      });
  }

  /**
   * @author Nermeen Mattar
   * @description sends a request to the server to delete a specific event
   * @param {number} eventId
   * @returns {Observable <any>}
   */
  deleteEvent(eventId: number):  Observable <any> {
    return this.httpRequestService.httpDelete(
      `events/${eventId}` , {
        success: 'EVENT.EVENT_DELETION_SUCCESS',
        fail: 'EVENT.EVENT_DELETION_FAIL'
      });
  }
}
