import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { TcEvent } from '../../../events/models/tc-event.model';

export class EventsServiceMock {

  constructor() {}

  getEvents(): Observable < Event [] > {
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
  createEvent(teamId: number, event: Event ): Observable < any > { // Event [] there are other info!
    return of({});
  }
  updateEvent(eventId: string, teamId: number, event: Event ): Observable < any > {
    return of({});
  }
}
