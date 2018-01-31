import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { AuthComponent } from './components/auth.component';
import { ResetComponent } from './components/reset/reset.component';
import { authRouting } from './auth.routing';
import { RegisterComponent } from './components/register/register.component';
import { MaterialModule } from '../shared/material/material.module';

@NgModule({
  imports: [
    CommonModule,
    authRouting,
    FormsModule,
  MaterialModule
  ],
  declarations: [LoginComponent, AuthComponent, ResetComponent, RegisterComponent],
})
export class AuthModule { }



