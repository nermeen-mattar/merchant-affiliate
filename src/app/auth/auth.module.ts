import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { LoginComponent } from './login/login.component';
import { AuthComponent } from './auth.component';
import { ResetComponent } from './reset/reset.component';
import { AuthRoutingModule } from './auth-routing.module';
import { RegisterComponent } from './register/register.component';
import { MaterialModule } from '../shared/material/material.module';
import { TokenHandlerService } from './services/token-handler.service';
import { AuthService } from './services/auth.service';
import { AuthGuard } from '../core/guards/auth.guard';

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
  ],
  providers: [
    TokenHandlerService,
    AuthService,
    AuthGuard
  ]
})
export class AuthModule {}
