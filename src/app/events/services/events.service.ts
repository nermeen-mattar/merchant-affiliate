import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

import { EventItem } from '../models/event-item.model';
import { UserService } from './../../core/services/user.service';
import { HttpRequestsService } from './../../core/services/http-requests.service';

@Injectable()
export class EventsService {

  constructor(private httpRequestService: HttpRequestsService, private userService: UserService) { }

  /**
   * @author Nermeen Mattar
   * @description sends a get request to the server to get the list of events for a specific user and team
   * @returns {Observable <any>}
   */
  getEvents(): Observable <any> { // EventItem[] there are other info!
    const currTeamId = 55; // dummy data for now
    return this.httpRequestService.httpPost(
      `events/byteamid/${currTeamId}` ,
      this.userService.getUsername()
    );
  }

}
