import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AuthServiceMock } from '../../../shared/mocks/services/auth.service.mock';
import { AuthService } from '../../services/auth.service';
import { LoginComponent } from './login.component';
import { RegisterService } from '../../services/register.service';
import { RegisterServiceMock } from '../../../shared/mocks/services/register.service.mock';


describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [LoginComponent],
        schemas: [
          CUSTOM_ELEMENTS_SCHEMA
        ],
        imports: [
          TranslateModule.forRoot(),
          FormsModule
        ],
        providers: [{
          provide: AuthService,
          useClass: AuthServiceMock
        }, {
          provide: RegisterService,
          useClass: RegisterServiceMock
        }]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
