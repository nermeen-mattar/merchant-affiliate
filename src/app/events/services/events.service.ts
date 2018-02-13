import { UserService } from './../../core/services/user.service';
import { Injectable } from '@angular/core';
import { HttpRequestsService } from './../../core/services/http-requests.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { EventItem } from '../models/event-item.model';

@Injectable()
export class EventsService {

  constructor(private httpRequestService: HttpRequestsService, private userService: UserService) { }

  // TODO[nermeen]: add method level comment
  getEvents(): Observable <any> {
    const currTeamId = 55; // dummy data for now
    return this.httpRequestService.httpPost(
      `events/byteamid/${currTeamId}` ,
      this.userService.getUsername()
    );
  }

}
