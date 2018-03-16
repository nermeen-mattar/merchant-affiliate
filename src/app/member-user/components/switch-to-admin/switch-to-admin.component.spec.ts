import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { UserServiceMock } from './../../../shared/mocks/services/user.serivce.mock';
import { UserService } from './../../../core/services/user.service';
import { AuthService } from '../../../auth/services/auth.service';
import { AuthServiceMock } from './../../../shared/mocks/services/auth.service.mock';
import { MaterialModule } from './../../../shared/material/material.module';
import { SwitchToAdminComponent } from './switch-to-admin.component';


describe('SwitchToAdminComponent', () => {
  let component: SwitchToAdminComponent;
  let fixture: ComponentFixture < SwitchToAdminComponent > ;

  beforeEach(async (() => {
    TestBed.configureTestingModule({
        declarations: [SwitchToAdminComponent],
        schemas: [
          CUSTOM_ELEMENTS_SCHEMA,
        ],
        providers: [{
            provide: AuthService,
            useClass: AuthServiceMock
          }, {
            provide: UserService,
            useClass: UserServiceMock
          }],
          imports: [
            TranslateModule.forRoot(),
            MaterialModule,
            FormsModule,
            NoopAnimationsModule
          ]
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SwitchToAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
