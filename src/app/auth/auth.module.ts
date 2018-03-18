import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { LoginComponent } from './components/login/login.component';
import { AuthComponent } from './auth.component';
import { ResetComponent } from './components/reset/reset.component';
import { AuthRoutingModule } from './auth-routing.module';
import { RegisterComponent } from './components/register/register.component';
import { MaterialModule } from '../shared/material/material.module';

@NgModule({
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    MaterialModule,
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
