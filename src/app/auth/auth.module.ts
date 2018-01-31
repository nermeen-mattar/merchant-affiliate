import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { AuthComponent } from './auth.component';
import { ResetComponent } from './reset/reset.component';
import { AuthRoutingModule } from './auth-routing.module';
import { RegisterComponent } from './register/register.component';
import { MaterialModule } from '../shared/material/material.module';

@NgModule({
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
  MaterialModule
  ],
  declarations: [LoginComponent, AuthComponent, ResetComponent, RegisterComponent],
})
export class AuthModule { }
