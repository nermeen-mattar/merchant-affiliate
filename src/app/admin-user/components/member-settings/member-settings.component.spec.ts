import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { MembersService } from './../../../members/services/members.service';
import { MembersServiceMock } from './../../../shared/mocks/services/members.service.mock';
import { FieldValidatorsService } from './../../../core/services/field-validators.service';
import { FieldValidatorsMockService } from './../../../shared/mocks/services/field-validators.service.mock';
import { UserServiceMock } from './../../../shared/mocks/services/user.serivce.mock';
import { UserService } from './../../../core/services/user.service';
import { MemberSettingsComponent } from './member-settings.component';
import { MaterialModule } from '../../../shared/material/material.module';

describe('MemberSettingsComponent', () => {
  let component: MemberSettingsComponent;
  let fixture: ComponentFixture<MemberSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ],
      imports: [
        TranslateModule.forRoot(),
        MaterialModule,
        NoopAnimationsModule,
        RouterTestingModule
      ],
      declarations: [ MemberSettingsComponent ],
      providers: [
        {
          provide: UserService,
          useClass: UserServiceMock
        },
        {
          provide: FieldValidatorsService,
          useClass: FieldValidatorsMockService
        }, {
          provide: MembersService,
          useClass: MembersServiceMock
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
