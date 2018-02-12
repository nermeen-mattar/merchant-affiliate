import { UserService } from './../../core/services/user.service';
import { Injectable } from '@angular/core';
import { HttpRequestsService } from './../../core/services/http-requests.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { EventItem } from './event-item.model';

@Injectable()
export class EventsService {

  constructor(private httpRequestService: HttpRequestsService, private userService: UserService) { }

  getEvents(): Observable <EventItem[]>{
    const currTeamId = 55; // dummy data for now
    return this.httpRequestService.httpPost('events/byteamid/' + currTeamId , this.userService.getUsername());
  }

}
