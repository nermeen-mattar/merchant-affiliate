import { TranslateModule } from '@ngx-translate/core';
import { TestBed, inject } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { MaterialModule } from '../../shared/material/material.module';

import { HttpRequestsService } from './http-requests.service';
import { MatSnackBar } from '@angular/material';

describe('HttpRequestsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HttpRequestsService],
      imports: [
        HttpClientModule,
        RouterTestingModule,
        MaterialModule,
        TranslateModule.forRoot()
      ]
    });
  });

  it('should be created', inject([HttpRequestsService], (service: HttpRequestsService) => {
    expect(service).toBeTruthy();
  }));
});
