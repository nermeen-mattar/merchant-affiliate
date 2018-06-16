import { TestBed, inject } from '@angular/core/testing';

import { UserServiceMock } from './../../shared/mocks/services/user.serivce.mock';
import { UserService } from './user.service';
import { AdminService } from './admin.service';
import { HttpRequestsService } from './http-requests.service';
import { HttpRequestsServiceMock } from '../../shared/mocks/services/http-requests.service.mock';


describe('AdminService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{
          provide: HttpRequestsService,
          useClass: HttpRequestsServiceMock
        },
        {
          provide: UserService,
          useClass: UserServiceMock
        },
        AdminService
      ]
    });
  });

  it('should be created', inject([AdminService], (service: AdminService) => {
    expect(service).toBeTruthy();
  }));
});
