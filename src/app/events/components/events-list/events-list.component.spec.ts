import { RouterTestingModule } from '@angular/router/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { EventsListComponent } from './events-list.component';
import { MaterialModule } from '../../../shared/material/material.module';
import { EventsService } from '../../services/events.service';
import { EventsServiceMock } from '../../../shared/mocks/services/events.service.mock';
import { UserServiceMock } from '../../../shared/mocks/services/user.serivce.mock';
import { UserService } from '../../../core/services/user.service';

describe('EventsListComponent', () => {
  let component: EventsListComponent;
  let fixture: ComponentFixture<EventsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventsListComponent ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ],
      imports: [
        TranslateModule.forRoot(),
        MaterialModule,
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
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
