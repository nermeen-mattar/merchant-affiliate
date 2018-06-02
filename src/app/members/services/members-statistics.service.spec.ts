import { HttpRequestsService } from './../../core/services/http-requests.service';
import { UserService } from './../../core/services/user.service';
import { TestBed, inject } from '@angular/core/testing';

import { MembersStatisticsService } from './members-statistics.service';
import { UserServiceMock } from '../../shared/mocks/services/user.serivce.mock';
import { HttpRequestsServiceMock } from '../../shared/mocks/services/http-requests.service.mock';

describe('MembersStatisticsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MembersStatisticsService,
        {
          provide: HttpRequestsService,
          useClass: HttpRequestsServiceMock
        },
        {
          provide: UserService,
          useClass: UserServiceMock
        }]
    });
  });

  it('should be created', inject([MembersStatisticsService], (service: MembersStatisticsService) => {
    expect(service).toBeTruthy();
  }));
});
