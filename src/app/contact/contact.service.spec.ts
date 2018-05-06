import { TestBed, inject } from '@angular/core/testing';

import { ContactService } from './contact.service';
import { HttpRequestsService } from './../core/services/http-requests.service';
import { HttpRequestsServiceMock } from '../shared/mocks/services/http-requests.service.mock';
import { MaterialModule } from '../shared/material/material.module';

describe('ContactService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        MaterialModule,
      ],
      providers: [ContactService,
        {
          provide: HttpRequestsService,
          useClass: HttpRequestsServiceMock
        }]
    });
  });

  it('should be created', inject([ContactService], (service: ContactService) => {
    expect(service).toBeTruthy();
  }));
});
