import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatListModule, MatMenuModule, MatIconModule} from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { HeaderComponent } from './components/header/header.component';
import { SharedModule } from '../shared/shared.module';
import { FooterComponent } from './components/footer/footer.component';
import { throwIfAlreadyLoaded } from './guards/module-import-guard';
import { HttpRequestsService } from './services/http-requests.service';
import { UserService } from './services/user.service';
import { FieldValidatorsService } from './services/field-validators.service';

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    SharedModule,
    RouterModule,
    HttpClientModule,
    TranslateModule
  ],
  declarations: [
    HeaderComponent,
    FooterComponent
  ],
  exports: [
    HeaderComponent,
    FooterComponent
  ],
  providers: [
    UserService,
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
