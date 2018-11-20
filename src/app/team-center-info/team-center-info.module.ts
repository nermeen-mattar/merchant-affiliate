import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ParallaxModule } from 'ngx-parallax';

import { SharedModule } from '../shared/shared.module';
import { AboutComponent } from './components/about/about.component';
// import { TeamCenterInfoRoutingModule } from './merchant-affiliate-info-routing.module';
import { TermsAndConditionsComponent } from './components/terms-and-conditions/terms-and-conditions.component';
import { DataPrivacyComponent } from './components/data-privacy/data-privacy.component';
import { LegalNoticeComponent } from './components/legal-notice/legal-notice.component';

@NgModule({
  imports: [
    CommonModule,
    // TeamCenterInfoRoutingModule,
    SharedModule,
    TranslateModule.forChild(),
    ParallaxModule
  ],
  declarations: [AboutComponent, TermsAndConditionsComponent, DataPrivacyComponent, LegalNoticeComponent]
})
export class TeamCenterInfoModule { }
