import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

import { MembersServiceMock } from '../../../shared/mocks/services/members.service.mock';
import { MembersService } from '../../services/members.service';
import { MaterialModule } from '../../../shared/material/material.module';
import { UserService } from '../../../core/services/user.service';
import { UserServiceMock } from '../../../shared/mocks/services/user.serivce.mock';
import { CustomersGiftComponent } from './customers-gift.component';

describe('CustomersGiftComponent', () => {
  let component: CustomersGiftComponent;
  let fixture: ComponentFixture<CustomersGiftComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      declarations: [CustomersGiftComponent],
      imports: [
        MaterialModule,
        TranslateModule.forRoot(),
        NoopAnimationsModule
      ],
      providers: [
        {
          provide: MembersService,
          useClass: MembersServiceMock
        },
        {
          provide: UserService,
          useClass: UserServiceMock
        }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomersGiftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
