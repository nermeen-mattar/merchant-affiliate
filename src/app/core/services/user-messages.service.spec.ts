import { TestBed, inject } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';

import { UserMessagesService } from './user-messages.service';
import { MaterialModule } from '../../shared/material/material.module';

describe('UserMessagesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserMessagesService],
      imports: [
        MaterialModule,
        TranslateModule.forRoot()
      ]
    });
  });

  it('should be created', inject([UserMessagesService], (service: UserMessagesService) => {
    expect(service).toBeTruthy();
  }));
});
