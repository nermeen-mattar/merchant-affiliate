import { TestBed, inject } from '@angular/core/testing';

import { UserServiceMock } from './../../shared/mocks/services/user.serivce.mock';
import { UserService } from './../../core/services/user.service';
import { HttpRequestsService } from './../../core/services/http-requests.service';
import { MembersService } from './members.service';
import { HttpRequestsServiceMock } from '../../shared/mocks/services/http-requests.service.mock';
import { MaterialModule } from '../../shared/material/material.module';

describe('MembersService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers:
      [MembersService,
        {
          provide: HttpRequestsService,
          useClass: HttpRequestsServiceMock
        },
        {
          provide: UserService,
          useClass: UserServiceMock
        }
      ],
    });
  });

  it('should be created', inject([MembersService], (service: MembersService) => {
    expect(service).toBeTruthy();
  }));
});
