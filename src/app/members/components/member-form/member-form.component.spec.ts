import { TranslateModule } from '@ngx-translate/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { MembersServiceMock } from '../../../shared/mocks/services/members.service.mock';
import { MembersService } from '../../services/members.service';
import { MemberFormComponent } from './member-form.component';
import { MaterialModule } from '../../../shared/material/material.module';
import { RouterTestingModule } from '@angular/router/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { UserService } from '../../../core/services/user.service';
import { UserServiceMock } from '../../../shared/mocks/services/user.serivce.mock';

describe('MemberFormComponent', () => {
  let component: MemberFormComponent;
  let fixture: ComponentFixture<MemberFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemberFormComponent ],
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
    fixture = TestBed.createComponent(MemberFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
