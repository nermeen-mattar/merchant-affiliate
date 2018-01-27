import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { AuthComponent } from './components/auth.component';
import { ResetComponent } from './components/reset/reset.component';
import { authRouting } from './auth.routing';
import { RegisterComponent } from './components/register/register.component';

@NgModule({
  imports: [
    CommonModule,
    authRouting
  ],
  declarations: [LoginComponent, AuthComponent, ResetComponent, RegisterComponent]
})
export class AuthModule { }



