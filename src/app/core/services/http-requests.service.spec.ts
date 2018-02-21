import { TestBed, inject } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';

import { HttpRequestsService } from './http-requests.service';

describe('HttpRequestsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HttpRequestsService],
      imports: [
        HttpClientModule,
        RouterTestingModule
      ]
    });
  });

  it('should be created', inject([HttpRequestsService], (service: HttpRequestsService) => {
    expect(service).toBeTruthy();
  }));
});
