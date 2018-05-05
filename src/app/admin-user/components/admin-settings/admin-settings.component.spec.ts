import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { FieldValidatorsService } from './../../../core/services/field-validators.service';
import { FieldValidatorsMockService } from './../../../shared/mocks/services/field-validators.service.mock';
import { UserServiceMock } from './../../../shared/mocks/services/user.serivce.mock';
import { UserService } from './../../../core/services/user.service';
import { AdminSettingsComponent } from './admin-settings.component';
import { MaterialModule } from '../../../shared/material/material.module';
import { UserMessagesMockService } from '../../../shared/mocks/services/user-messages.service.mock';

describe('AdminSettingsComponent', () => {
  let component: AdminSettingsComponent;
  let fixture: ComponentFixture<AdminSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ],
      imports: [
        TranslateModule.forRoot(),
        MaterialModule,
        NoopAnimationsModule
      ],
      declarations: [ AdminSettingsComponent ],
      providers: [
        {
          provide: UserService,
          useClass: UserServiceMock
        },
        {
          provide: FieldValidatorsService,
          useClass: FieldValidatorsMockService
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
