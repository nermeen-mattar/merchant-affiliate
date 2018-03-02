import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { EventItem } from '../../../events/models/event-item.model';

export class EventsServiceMock {

  constructor() {}

  getEvents(): Observable < EventItem[] > {
    return of([]);
  }

  getEventDetails(eventId) {
    return of ({
        absent: [],
        present: []
      });
  }
  getEvent(eventId: string): Observable < any > {
    return of({});
  }

  createEvent(teamId: number, event: EventItem): Observable < any > { // EventItem[] there are other info!
    return of({});
  }

  updateEvent(eventId: string, teamId: number, event: EventItem): Observable < any > {
    return of({});
  }
}
