import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TranslateModule } from '@ngx-translate/core';
import { EmailActivationComponent } from './email-activation.component';
import { MaterialModule } from '../shared/material/material.module';
import { HttpRequestsService } from '../core/services/http-requests.service';
import { HttpRequestsServiceMock } from '../shared/mocks/services/http-requests.service.mock';

describe('EmailActivationComponent', () => {
  let component: EmailActivationComponent;
  let fixture: ComponentFixture<EmailActivationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MaterialModule,
        TranslateModule.forRoot()
      ],
      providers: [
        {
          provide: HttpRequestsService,
          useClass: HttpRequestsServiceMock
        }],
      declarations: [ EmailActivationComponent ]
    })

    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailActivationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
