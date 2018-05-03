import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatListModule, MatMenuModule, MatIconModule} from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

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
import { DeviceDetectorModule } from 'ngx-device-detector';
import { DeviceClassesDirective } from './directives/device-classes.directive';
import { RegisterService } from '../auth/services/register.service';

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    SharedModule,
    RouterModule,
    HttpClientModule,
    TranslateModule,
    DeviceDetectorModule.forRoot()
  ],
  declarations: [
    HeaderComponent,
    FooterComponent,
    DeviceClassesDirective
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    DeviceClassesDirective
  ],
  providers: [
    UserService,
    AdminService,
    RegisterService, /* check if it is better to place it in auth module */
    AuthService,
    AuthGuard,
    TokenHandlerService,
    UserMessagesService,
    HttpRequestsService,
    FieldValidatorsService
  ]
})
export class CoreModule {
  /* Only the root AppModule should import the CoreModule*/
  constructor( @Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
 }
