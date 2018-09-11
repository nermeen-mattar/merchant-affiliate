import { TranslateModule } from '@ngx-translate/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { MembersServiceMock } from '../../../shared/mocks/services/members.service.mock';
import { MembersService } from '../../services/members.service';
import { MemberActivationFormComponent } from './member-activation-form.component';
import { MaterialModule } from '../../../shared/material/material.module';
import { RouterTestingModule } from '@angular/router/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { UserService } from '../../../core/services/user.service';
import { UserServiceMock } from '../../../shared/mocks/services/user.serivce.mock';

describe('MemberActivationFormComponent', () => {
  let component: MemberActivationFormComponent;
  let fixture: ComponentFixture<MemberActivationFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemberActivationFormComponent ],
      imports: [
        ReactiveFormsModule,
        TranslateModule.forRoot(),
        MaterialModule,
        RouterTestingModule,
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
        }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberActivationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
