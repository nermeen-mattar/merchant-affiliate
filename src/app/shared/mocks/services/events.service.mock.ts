import { Observable } from 'rxjs/internal/Observable';
import { of } from 'rxjs';

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
  getEvent(eventId: number): Observable < any > {
    return of({});
  }
  createEvent(teamId: number, event: Event ): Observable < any > { // Event [] there are other info!
    return of({});
  }
  updateEvent(eventId: number, teamId: number, event: Event ): Observable < any > {
    return of({});
  }
}
