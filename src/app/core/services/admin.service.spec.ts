import { TestBed, inject } from '@angular/core/testing';

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
        AdminService
      ]
    });
  });

  it('should be created', inject([AdminService], (service: AdminService) => {
    expect(service).toBeTruthy();
  }));
});
