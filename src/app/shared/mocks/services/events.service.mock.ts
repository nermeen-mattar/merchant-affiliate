import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { EventItem } from '../../../events/models/event-item.model';

export class EventsServiceMock {

  constructor() { }

  // TODO[nermeen]: add method level comment
  getEvents(): Observable <EventItem[]> {
    const currTeamId = 55; // dummy data for now
    return of([]);
  }
}
