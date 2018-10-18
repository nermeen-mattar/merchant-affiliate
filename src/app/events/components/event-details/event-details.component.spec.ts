import { RouterTestingModule } from '@angular/router/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

import { MaterialModule } from '../../../shared/material/material.module';
import { EventsServiceMock } from '../../../shared/mocks/services/events.service.mock';
import { EventsService } from '../../services/events.service';
import { EventDetailsComponent } from './event-details.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('EventDetailsComponent', () => {
  let component: EventDetailsComponent;
  let fixture: ComponentFixture<EventDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventDetailsComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA], // NO_ERRORS_SCHEMA not needed
      imports: [
        TranslateModule.forRoot(),
        MaterialModule,
        NoopAnimationsModule,
        RouterTestingModule
      ],
      providers: [{
          provide: EventsService,
         useClass: EventsServiceMock
       }]
    },
  )
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
