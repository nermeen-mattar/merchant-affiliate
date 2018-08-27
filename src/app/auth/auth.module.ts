import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { SharedModule } from './../shared/shared.module';
import { LoginComponent } from './components/login/login.component';
import { AuthComponent } from './auth.component';
import { ResetComponent } from './components/request-reset-password/request-reset-password.component';
import { AuthRoutingModule } from './auth-routing.module';
import { RegisterComponent } from './components/register/register.component';

@NgModule({
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    TranslateModule
  ],
  declarations: [
    LoginComponent,
    AuthComponent,
    ResetComponent,
    RegisterComponent
  ]
})
export class AuthModule {}
