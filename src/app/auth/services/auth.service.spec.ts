import { TestBed, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { HttpRequestsService } from '../../core/services/http-requests.service';
import { TokenHandlerServiceMock } from '../../shared/mocks/services/token-handler.service.mock';
import { TokenHandlerService } from './token-handler.service';
import { HttpRequestsServiceMock } from '../../shared/mocks/services/http-requests.service.mock';
import { UserServiceMock } from '../../shared/mocks/services/user.serivce.mock';
import { UserService } from '../../core/services/user.service';

import { AuthService } from './auth.service';
import { UserMessagesService } from '../../core/services/user-messages.service';

describe('AuthService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthService,
        {
          provide: HttpRequestsService,
          useClass: HttpRequestsServiceMock
        },
        {
          provide: UserMessagesService,
          useClass: UserServiceMock
        },
        {
          provide: TokenHandlerService,
          useClass: TokenHandlerServiceMock
        },
        {
          provide: UserService,
          useClass: UserServiceMock
        }
      ],
      imports: [
        RouterTestingModule
      ]
    });
  });

  it('should be created', inject([AuthService], (service: AuthService) => {
    expect(service).toBeTruthy();
  }));
});
