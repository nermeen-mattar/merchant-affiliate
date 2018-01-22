import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { AuthComponent } from './components/auth.component';
import { ResetComponent } from './components/reset/reset.component';
import { authRouting } from './auth.routing';

@NgModule({
  imports: [
    CommonModule,
    authRouting
  ],
  declarations: [LoginComponent, AuthComponent, ResetComponent]
})
export class AuthModule { }



