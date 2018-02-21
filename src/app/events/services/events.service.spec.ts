import { TestBed, inject } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { EventsService } from './events.service';
import { HttpRequestsService } from '../../core/services/http-requests.service';
import { RouterTestingModule } from '@angular/router/testing';
import { UserService } from '../../core/services/user.service';

describe('EventsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EventsService, HttpRequestsService, UserService],
      imports: [HttpClientModule, RouterTestingModule]
    });
  });

  it('should be created', inject([EventsService], (service: EventsService) => {
    expect(service).toBeTruthy();
  }));
});
