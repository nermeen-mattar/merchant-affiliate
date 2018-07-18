import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { MembersService } from './../members/services/members.service';
import { LoginStatusService } from './../auth/services/login-status.service';
import { UserMessagesService } from './services/user-messages.service';
import { HeaderComponent } from './components/header/header.component';
import { SharedModule } from '../shared/shared.module';
import { FooterComponent } from './components/footer/footer.component';
import { throwIfAlreadyLoaded } from './guards/module-import-guard';
import { HttpRequestsService } from './services/http-requests.service';
import { UserService } from './services/user.service';
import { FieldValidatorsService } from './services/field-validators.service';
import { AuthGuard } from './guards/auth.guard';
import { AuthService } from '../auth/services/auth.service';
import { TokenHandlerService } from '../auth/services/token-handler.service';
import { AdminService } from './services/admin.service';
import { RegisterService } from '../auth/services/register.service';
import { TeamsService } from './services/teams.service';
import { DateService } from './services/date.service';

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    SharedModule,
    RouterModule,
    HttpClientModule,
    TranslateModule,
  ],
  declarations: [
    HeaderComponent,
    FooterComponent,
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
  ],
  providers: [
    UserService,
    AdminService,
    MembersService,
    RegisterService, /* check if it is better to place it in auth module */
    AuthService,
    LoginStatusService,
    AuthGuard,
    TokenHandlerService,
    UserMessagesService,
    HttpRequestsService,
    FieldValidatorsService,
    TeamsService,
    DateService
  ]
})
export class CoreModule {
  /* Only the root AppModule should import the CoreModule*/
  constructor( @Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
 }
