import { FieldValidatorsService } from './../../core/services/field-validators.service';
import { EventsService } from './../services/events.service';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { EventFormComponent } from './event-form.component';
import { MaterialModule } from '../../shared/material/material.module';
import { EventsServiceMock } from '../../shared/mocks/services/events.service.mock';
import { UserService } from '../../core/services/user.service';
import { UserServiceMock } from '../../shared/mocks/services/user.serivce.mock';
import { FieldValidatorsMockService } from '../../shared/mocks/services/field-validators.service.mock';

describe('EventFormComponent', () => {
  let component: EventFormComponent;
  let fixture: ComponentFixture<EventFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventFormComponent ],

      imports: [
        ReactiveFormsModule,
        TranslateModule.forRoot(),
        MaterialModule,
        RouterTestingModule,
        NoopAnimationsModule
      ],
      providers: [
        {
          provide: EventsService,
          useClass: EventsServiceMock
        },
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
    fixture = TestBed.createComponent(EventFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
